package ru.TexTeam.TexTom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String login;    // Для читателя - email, для сотрудника - логин
    private String password;

}