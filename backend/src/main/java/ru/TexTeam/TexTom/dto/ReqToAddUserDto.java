package ru.TexTeam.TexTom.dto;

import ru.TexTeam.TexTom.entity.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqToAddUserDto {
    private Long id;
    private String fullName;
    private String libraryCard;
    private Date regDate;
    private String email;
    private UserStatus status;
}
