package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Long> {
}
