package ru.TexTeam.TexTom.controllers;

import ru.TexTeam.TexTom.dto.ReqToAddUserDto;
import ru.TexTeam.TexTom.dto.SetStatusForUserDto;
import ru.TexTeam.TexTom.entity.ContractUser;
import ru.TexTeam.TexTom.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/manage/user")
public class UserManagementController {

    private final UserService userService;

    public UserManagementController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Позволяет получать список заявок на студентов по токену для библиотекаря
     * @return список заявок на студентов
     */
    @GetMapping("/getMyStudents")
    public ResponseEntity<List<ReqToAddUserDto>> getMyStudents(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt jwt) {
            ContractUser user = userService.getContractUserByLogin(jwt.getSubject());
            return ResponseEntity.ok(userService.getReqToAddUsersByOrgId(user.getContract().getOrganisation().getId()));
        }
        return ResponseEntity.status(HttpStatus.valueOf(401)).body(null);
    }

    @PostMapping("/setStatus")
    public ResponseEntity<String> setStatus(@RequestBody SetStatusForUserDto dto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof Jwt jwt) {
            ContractUser user = userService.getContractUserByLogin(jwt.getSubject());
            Long orgId = user.getContract().getOrganisation().getId();
            userService.setStatusForReader(dto, orgId);
            return ResponseEntity.ok(null);
        }
        else return ResponseEntity.status(401).body("You do not have access to perform this action");
    }


}
