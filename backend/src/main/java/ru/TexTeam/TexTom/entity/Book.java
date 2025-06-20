package ru.TexTeam.TexTom.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name = "book")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    public Book(String name, List<Author> authors, Publisher publisher, Discipline discipline, PubType pubType, short year, int pages, String isbn) {
        this.name = name;
        this.authors = authors;
        this.publisher = publisher;
        this.discipline = discipline;
        this.pubType = pubType;
        this.year = year;
        this.pages = pages;
        this.isbn = isbn;
        this.rating = 0;
    }

    public Book(String name, List<Author> authors, Publisher publisher, Discipline discipline, PubType pubType, short year, int pages, String isbn, float rating) {
        this.name = name;
        this.authors = authors;
        this.publisher = publisher;
        this.discipline = discipline;
        this.pubType = pubType;
        this.year = year;
        this.pages = pages;
        this.isbn = isbn;
        this.rating = rating;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private List<Author> authors;

    @ManyToOne
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "discipline_id")
    private Discipline discipline;

    @ManyToOne
    @JoinColumn(name = "pub_type_id")
    private PubType pubType;

    @Column
    private short year;

    @Column
    private int pages;

    @Column(columnDefinition = "VARCHAR")
    private String annotation; //
    @ManyToMany
    @JoinTable(
            name = "book_keywords",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    private List<Keyword> keyWords;//ключевые темы, слова

    @ManyToMany
    @JoinTable(
            name = "book_features",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "features_id")
    )
    private List<Feature> features; //Особенности книги

    // В базе данных будет скрипт, который раз в день вычисляет средний рейтинг из таблицы отзывов
    @Column
    private float rating;

    @Column
    private String isbn;

}
