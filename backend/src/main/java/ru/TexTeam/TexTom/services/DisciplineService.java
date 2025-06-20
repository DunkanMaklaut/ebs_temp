package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.entity.Discipline;
import ru.TexTeam.TexTom.repository.DisciplineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DisciplineService {
    private final DisciplineRepository disciplineRepository;

    @Autowired
    public DisciplineService(DisciplineRepository disciplineRepository) {
        this.disciplineRepository = disciplineRepository;
    }

    public Discipline getDisciplineById(Long id){
        return disciplineRepository.getDisciplineById(id);
    }

    public List<Discipline> getAllDisciplines(){
        return disciplineRepository.findAll();
    }
}
