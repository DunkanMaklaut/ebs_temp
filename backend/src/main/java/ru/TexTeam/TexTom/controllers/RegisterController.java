package ru.TexTeam.TexTom.controllers;

import ru.TexTeam.TexTom.dto.OrgDropListDto;
import ru.TexTeam.TexTom.dto.RegisterDto;
import ru.TexTeam.TexTom.services.OrganisationService;
import ru.TexTeam.TexTom.services.RegisterService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/register")
public class RegisterController {
    private final RegisterService registerService;
    private final OrganisationService organisationService;
    /**
     * @param dto Данные с формы регистрации
     * @return Строку с информацией об успешной регистрации или ошибке
     */
    @PostMapping()
    public String register(@RequestBody RegisterDto dto) {
        return registerService.register(dto);
    }

    /**
     * Получение выпадающего списка для поля "ВУЗ"
     * на странице регистрации отсортированного
     * по названию в алфавитном порядке.
     * @return Список организаций с id и названием
     */
    @GetMapping("/orgList")
    public ResponseEntity<List<OrgDropListDto>> getOrgDropList(){
        return ResponseEntity.ok(organisationService.getOrgDropList());
    }
}
