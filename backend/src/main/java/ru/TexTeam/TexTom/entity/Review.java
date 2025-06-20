package ru.TexTeam.TexTom.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "review")
@NoArgsConstructor
@Data
public class Review {
    public Review(User user, Book book, Date date, Integer rating, String text) {
        this.user = user;
        this.book = book;
        this.date = date;
        if (rating > 5) rating = 5;
        else if (rating < 1) rating = 1;
        this.rating = rating;
        this.text = text;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn()
    private User user;

    @ManyToOne
    @JoinColumn()
    private Book book;

    @Column
    private Date date;

    @Column
    private Integer rating;

    @Column
    private String text;
}
