package ru.TexTeam.TexTom.dto;

import ru.TexTeam.TexTom.entity.Author;
import lombok.Data;


import java.util.List;

/**
 * DTO для маленькой карточки с книгой
 * для главного экрана, списка книг и т.п.
 */
@Data
public class BookSmallDto {
    private Long id;
    private String name;
    private List<Author> authors;
    private String coverSheet; //Обложка формате base64
}
