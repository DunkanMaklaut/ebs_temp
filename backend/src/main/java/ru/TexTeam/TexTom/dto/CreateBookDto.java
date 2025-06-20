package ru.TexTeam.TexTom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBookDto {
    private Long id;
    private String name;
    private List<Long> authors;
    private Long publisher;
    private Long discipline;
    private Long pubType;
    private short year;
    private int pages;
    private String isbn;
}
