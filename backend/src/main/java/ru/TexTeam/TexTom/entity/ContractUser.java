package ru.TexTeam.TexTom.entity;

import ru.TexTeam.TexTom.entity.enums.ContractRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contract_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContractUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    private Contract contract;

    @Column
    private String login;

    @Column
    private String password;

    @Enumerated(EnumType.ORDINAL)
    private ContractRole role;

    @Column(columnDefinition = "boolean default false")
    private boolean blocked;
}

