package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.RegisterDto;
import ru.TexTeam.TexTom.entity.Organisation;
import ru.TexTeam.TexTom.entity.User;
import ru.TexTeam.TexTom.entity.enums.UserStatus;
import ru.TexTeam.TexTom.repository.OrganisationRepository;
import ru.TexTeam.TexTom.repository.UserRepository;
import ru.TexTeam.TexTom.validator.EmailValidator;
import ru.TexTeam.TexTom.validator.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service

public class RegisterService {
    private final UserRepository userRepository;
    private final OrganisationRepository organisationRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RegisterService(UserRepository userRepository, OrganisationRepository organisationRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.organisationRepository = organisationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public String register( RegisterDto dto) {
        Optional<Organisation> organisation = organisationRepository
                .findById(dto.getOrganisationId());
        if (userRepository.findByLibraryCard(dto.getLibraryCard()).isPresent()) {
            return "Пользователь с таким читательским билетом уже существует";
        }
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Пользователь с таким email уже существует";
        }
        if (!EmailValidator.validate(dto.getEmail())) {
            return "Введен некорректный email";
        }
        if (organisation.isEmpty()) {
            return "Такой организации не существует!";
        }
        if (!PasswordValidator.validate(dto.getPassword())) {
            return "Пароль не соответствует требованиям";
        }
        User user = new User();
        user.setFullName(dto.getFullName());
        user.setLibraryCard( dto.getLibraryCard());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setOrganisation(organisation.get());
        user.setStatus(UserStatus.READY);
        userRepository.save(user);
        return "Пользователь успешно зарегистрирован";
    }


}
