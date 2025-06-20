package ru.TexTeam.TexTom.entity;
import ru.TexTeam.TexTom.entity.enums.UserStatus;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String fullName;

    @Column
    private String libraryCard;

    @Column
    private String password;

    @Column(columnDefinition = "DATE")
    @CreationTimestamp
    private Date regDate;

    @Column
    private String email;

    @ManyToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;

    @Enumerated(EnumType.ORDINAL)
    private UserStatus status;


    public User(String fullName, String libraryCard, String password, String email, Organisation organisation) {
        this.fullName = fullName;
        this.libraryCard = libraryCard;
        this.password = password;
        this.email = email;
        this.organisation = organisation;
        this.status = UserStatus.READY;
    }
}
