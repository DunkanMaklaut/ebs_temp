package ru.TexTeam.TexTom.dto;

import ru.TexTeam.TexTom.entity.Organisation;
import ru.TexTeam.TexTom.entity.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AboutUserDto {
    private Long id;
    private String email;
    private String fullName;
    private String libraryCard;
    private Organisation organisation;
    private UserStatus status;



}
