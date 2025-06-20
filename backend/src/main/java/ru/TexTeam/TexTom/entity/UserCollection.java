package ru.TexTeam.TexTom.entity;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "userCollection")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @ManyToMany
    @JoinTable(
            name = "user_collection_books",
            joinColumns = @JoinColumn(name = "user_collection_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> books;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    @Temporal(TemporalType.DATE)
    private Date creationDate;

}

