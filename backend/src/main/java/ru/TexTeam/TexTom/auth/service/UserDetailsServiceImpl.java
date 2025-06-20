package ru.TexTeam.TexTom.auth.service;

import ru.TexTeam.TexTom.auth.UserPrincipal;
import ru.TexTeam.TexTom.entity.ContractUser;
import ru.TexTeam.TexTom.entity.User;
import ru.TexTeam.TexTom.entity.enums.UserStatus;
import ru.TexTeam.TexTom.repository.ContractUserRepository;
import ru.TexTeam.TexTom.repository.UserRepository;
import ru.TexTeam.TexTom.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserService userService;
    @Autowired
    private ContractUserRepository contractUserRepository;

    @Override
    public UserDetails loadUserByUsername(String login
    ) throws UsernameNotFoundException {
        if (login.contains("@")) { //Если есть @ то это email -> пользователь
            User user = userService.getUserByEmail(login);
            boolean hasSubscribe = false;
            if (
                    userService.hasSubscribe(user.getOrganisation().getId()) //Имеет подписку организация
                            && user.getStatus().equals(UserStatus.CONFIRMED) //Подтвержденный библиотекарем
            ) {
                hasSubscribe = true;
            }
            return UserPrincipal.create(user, hasSubscribe);
        } else {
            ContractUser user = contractUserRepository.findByLogin(login)
                    .orElseThrow(() -> new UsernameNotFoundException("Staff not found"));
            return UserPrincipal.create(user);
        }

    }

}
