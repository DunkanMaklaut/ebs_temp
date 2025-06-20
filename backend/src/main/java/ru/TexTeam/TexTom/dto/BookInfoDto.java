package ru.TexTeam.TexTom.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.TexTeam.TexTom.entity.*;

import java.util.List;

/**
 * Класс для отображения полной информации о книге
 * для страницы информации о книге
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookInfoDto {
    private Long id;
    private String name;
    private List<Author> authors;
    private Discipline discipline;
    private Publisher publisher;
    private String pubType;
    private Float rating;
    private List<Keyword> keyWords;
    private List<Feature> features;
    private String annotation;
    private int year;
    private int pages;
    private String isbn;
    private String coverSheet; //Обложка формате base64

    public BookInfoDto(Book book) {
        id = book.getId();
        name = book.getName();
        authors = book.getAuthors();
        discipline = book.getDiscipline();
        publisher = book.getPublisher();
        pubType = book.getPubType().getName();
        keyWords = book.getKeyWords();
        features = book.getFeatures();
        annotation = book.getAnnotation();
        year = book.getYear();
        pages = book.getPages();
        isbn = book.getIsbn();
        rating = book.getRating();
    }
}
