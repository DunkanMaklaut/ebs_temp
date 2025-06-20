package ru.TexTeam.TexTom.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "contract")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name ="organisation_id")
    private Organisation organisation;

    @Column(columnDefinition = "DATE")
    private Date dateStart;

    @Column(columnDefinition = "DATE")
    private Date dateEnd;
}
