package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.Discipline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
    public Discipline getDisciplineById(Long id);
}

