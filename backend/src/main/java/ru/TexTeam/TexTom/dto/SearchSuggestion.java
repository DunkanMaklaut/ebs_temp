package ru.TexTeam.TexTom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Класс подсказки для поиска
 * Возвращается на фронтенд
 * Без картинки
 * И скорее всего её не будет
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchSuggestion {
    Long id; //Неуникальный id записи, нужен для создания обращения к подсказке
    String suggestion; //Текст подсказки, название книги/автора/коллекции
    String category; //категория подсказки Автор/книга/коллекция, возможно для фильтрации
}
