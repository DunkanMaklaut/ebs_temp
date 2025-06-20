package ru.TexTeam.TexTom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Класс приема инфы о регистрации, пока пусть лежит,
 * ибо понятия не имею как она сейчас должна работать...
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    private Long organisationId;
    private String libraryCard;
    private String fullName;
    private String email;
    private String password;
}
