package ru.TexTeam.TexTom.entity;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "org_subscription")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrgSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Temporal(TemporalType.DATE)
    private Date startOfSub;

    @Column
    @Temporal(TemporalType.DATE)
    private Date endOfSub;

    @Column
    private int cost;

    @OneToOne
    @JoinColumn(name = "organisation_id")
    private Organisation organisation;
}
