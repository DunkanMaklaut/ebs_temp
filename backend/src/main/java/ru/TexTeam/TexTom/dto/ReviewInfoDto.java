package ru.TexTeam.TexTom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewInfoDto {
    private Long id;
    private Long userId;
    private String fullUserName;
    private Date date;
    private Integer rating;
    private String text;

}
