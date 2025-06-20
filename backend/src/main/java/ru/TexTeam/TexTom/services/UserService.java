package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.ReqToAddUserDto;
import ru.TexTeam.TexTom.dto.SetStatusForUserDto;
import ru.TexTeam.TexTom.entity.ContractUser;
import ru.TexTeam.TexTom.entity.User;
import ru.TexTeam.TexTom.entity.enums.UserStatus;
import ru.TexTeam.TexTom.repository.ContractUserRepository;
import ru.TexTeam.TexTom.repository.OrgSubscriptionRepository;
import ru.TexTeam.TexTom.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final ContractUserRepository contractUserRepository;
    private final OrgSubscriptionRepository orgSubscriptionRepository;

    public ContractUser getContractUserByLogin(String login){
        Optional<ContractUser> contractUser = contractUserRepository.findByLogin(login);
        if(contractUser.isPresent())
        return contractUser.get();
        else throw new RuntimeException("Contract user not found");
    }
    public List<ReqToAddUserDto> getReqToAddUsersByOrgId(Long orgId){
        return userListToReqDto(userRepository.findAllByOrganisationId(orgId));
    };

    public List<ReqToAddUserDto> userListToReqDto(List<User> list){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        List<ReqToAddUserDto> req = new ArrayList<>();
        for (User user:list
             ) {
            req.add(new ReqToAddUserDto(
               user.getId(),
               user.getFullName(),
               user.getLibraryCard(),
                    Date.valueOf(format.format(user.getRegDate())),
               user.getEmail(),
               user.getStatus()
            ));
        }
        return req;
    }

    public boolean hasSubscribe(Long orgId){
        return orgSubscriptionRepository.findActiveSubscribe(orgId) > 0;
    }

    public User getUserById(Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) return user.get();
        else throw new RuntimeException("User by id NOT FOUND!");
    }
    public User getUserByEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) return user.get();
        else throw new RuntimeException("User by id NOT FOUND!");
    }

    public void setStatusForReader(SetStatusForUserDto dto, Long orgId){
        userRepository.updateStatus(dto.getId(), UserStatus.valueOf(dto.getStatus()), orgId);
    }
}
