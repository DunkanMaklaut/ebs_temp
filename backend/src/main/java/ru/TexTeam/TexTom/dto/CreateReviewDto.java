package ru.TexTeam.TexTom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Dto для приема отзыва о книге с фронтенда
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReviewDto {
    private Long userId;
    private Long bookId;
    private Integer rating;
    private String text;
}
