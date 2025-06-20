package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.PubType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PubTypeRepository extends JpaRepository<PubType, Long> {
}
