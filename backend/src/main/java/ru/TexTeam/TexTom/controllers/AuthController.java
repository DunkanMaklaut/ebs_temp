package ru.TexTeam.TexTom.controllers;


import ru.TexTeam.TexTom.dto.LoginRequest;
import ru.TexTeam.TexTom.auth.service.TokenService;
import ru.TexTeam.TexTom.dto.AboutContractUserDto;
import ru.TexTeam.TexTom.dto.AboutUserDto;
import ru.TexTeam.TexTom.entity.ContractUser;
import ru.TexTeam.TexTom.entity.User;
import ru.TexTeam.TexTom.services.OrganisationService;
import ru.TexTeam.TexTom.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Апи для получения токена входа.
     * @param loginRequest Форма входа. Пара логин и пароль;
     *                     Если читатель то email;
     *                     Если сотрудник то логин;
     *                     Отличаем их по наличию символа @ в логине;
     * @return  Bearer JWT Токен если все хорошо;
     *          или статус 500 если не найден;
     *          или статус 400 Найден но пароль не верный;
     */
    @PostMapping("/token")
    public ResponseEntity<String> token(@RequestBody LoginRequest loginRequest) {
        if(loginRequest.getLogin().contains("@")){
            User user = userService.getUserByEmail(loginRequest.getLogin());
            if(!passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
            }
        }
        else {
            ContractUser contractUser = userService.getContractUserByLogin(loginRequest.getLogin());
            if(!passwordEncoder.matches(loginRequest.getPassword(),contractUser.getPassword())){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
            }
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getLogin(), loginRequest.getPassword())
        );


        return ResponseEntity.ok(tokenService.generateToken(authentication));
    }

    /**
     * Получение информации о текущем вошедшем пользователе;
     * Требует наличие Bearer токена;
     * @return информацию о найденном пользователе со статусом ОК;
     *         Null если не найден токен со статусом 404;
     *         Статус 500 если не найден пользователь;
     */
    @GetMapping("/aboutReader")
    public ResponseEntity<AboutUserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt jwt) {
            User user = userService.getUserByEmail(jwt.getSubject());
            AboutUserDto userDto = new AboutUserDto(
                    user.getId(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getLibraryCard(),
                    user.getOrganisation(),
                    user.getStatus());
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    /**
     * Получение информации о текущем вошедшем сотруднике;
     * Требует наличие Bearer токена;
     * @return информацию о найденном сотруднике со статусом ОК;
     *         Null если не найден токен со статусом 404;
     *         Статус 500 если не найден сотрудник;
     */
    @GetMapping("/aboutStaff")
    public ResponseEntity<AboutContractUserDto> getStaff() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt jwt) {
            ContractUser user = userService.getContractUserByLogin(jwt.getSubject());
            AboutContractUserDto userDto = new AboutContractUserDto(
                    user.getId(),
                    user.getLogin(),
                    user.getContract().getOrganisation().getName(),
                    user.getRole().name()
                    );
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}