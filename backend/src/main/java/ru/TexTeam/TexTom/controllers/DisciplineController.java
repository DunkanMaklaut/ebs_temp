package ru.TexTeam.TexTom.controllers;

import ru.TexTeam.TexTom.entity.Discipline;
import ru.TexTeam.TexTom.services.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/discipline")
public class DisciplineController {
    @Autowired
    private DisciplineService disciplineService;

    /**
     * Получить дисциплину по id
     * @param id
     * @return Возвращает найденую дисциплину
     */
    @GetMapping("/{id}")
    public Discipline getDisciplineById(@PathVariable("id") Long id){
        return disciplineService.getDisciplineById(id);
    }

    /**
     * Функция возвращает все дисциплины из базы данных
     * @return Список дисциплин
     */
    @GetMapping("/all")
    public List<Discipline> getAllDisciplines(){
        return disciplineService.getAllDisciplines();
    }
}
