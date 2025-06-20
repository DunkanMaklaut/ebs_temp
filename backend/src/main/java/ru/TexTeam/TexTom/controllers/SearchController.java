package ru.TexTeam.TexTom.controllers;

import ru.TexTeam.TexTom.dto.FullSearchDto;
import ru.TexTeam.TexTom.dto.SearchSuggestion;
import ru.TexTeam.TexTom.services.SearchService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/Search")
public class SearchController {

    private final SearchService searchService;
    /**
     * Поиск по книгам, авторам
     * по названию или isbn книги,
     * имени автора
     * @param query текст запроса
     * @param limit Ограничение по количеству выдаваемых подсказок
     * @return DTO подсказки: id элемента, текст подсказки, категорию(автор/книга/коллекция)
     */
    @GetMapping("/small/{query}/{limit}")
    public List<SearchSuggestion> smallSearch(@PathVariable("query") String query, @PathVariable("limit") int limit){
        return searchService.smallSearch(query, limit);
    }

    /**
     * Поиск по книгам, авторам
     * по названию или isbn книги,
     * имени автора
     * @param query текст запроса
     * @return DTO Содержащее 3 массива: Книги(small), авторы
     */
    @GetMapping("/full/{query}")
    public FullSearchDto fullSearch(@PathVariable String query){
        return searchService.fullSearch(query);
    }
}
