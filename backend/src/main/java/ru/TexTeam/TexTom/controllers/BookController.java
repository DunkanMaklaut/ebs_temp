package ru.TexTeam.TexTom.controllers;

import ru.TexTeam.TexTom.dto.BookInfoDto;
import ru.TexTeam.TexTom.dto.BookSmallDto;
import ru.TexTeam.TexTom.entity.Book;
import ru.TexTeam.TexTom.services.BookService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    private BookService bookService;

    /**
     * Получение экземпляра книги для экрана информации по id
     *
     * @param id id книги
     * @return возвращает DTO с данными для экрана информации о книге
     */
    @GetMapping("/{id}")
    public BookInfoDto getBookInfoById(@PathVariable("id") Long id) {
        return bookService.getBookInfoById(id);
    }

    /**
     * Функция возвращает карточки книг в указанном количестве
     *
     * @param count количество запрашиваемых книг
     * @return Список карточек книг
     */

    @GetMapping("/getRandomByCount/{count}")
    public List<BookSmallDto> getRandomByCount(@PathVariable("count") int count) {
        return bookService.getRandomByCount(count);
    }

    /**
     * Функция возвращает рандомные карточки книг
     * в указанном количестве из указанной дисциплины
     *
     * @param count количество запрашиваемых книг
     * @param dis   id дисциплины в которой нужно искать
     * @return Список карточек книг
     */
    @GetMapping("/getRandomByCountInDiscipline/{dis}/{count}")
    public List<BookSmallDto> getRandomByCountInDiscipline(@PathVariable("dis") Long dis, @PathVariable("count") int count) {
        return bookService.getRandomByCountInDiscipline(dis, count);
    }

    /**
     * Функция постранично возвращает карточку книги из указанной дисциплины
     * Карточка книги: карточка как на главной странице ID название, автор, обложка(blob)
     *
     * @param dis  id дисциплины
     * @param size количество отображаемых книг
     * @param page номер страницы
     */

    @GetMapping("/getSmallByDiscipline/{dis}/{size}/{page}")
    public Iterable<BookSmallDto> getSmallByDisciplinePaged(@PathVariable("dis") Long dis,
                                                            @PathVariable("size") int size, @PathVariable("page") int page) {
        return bookService.getPagedSmallBookByDiscipline(dis, page, size);
    }

    /**
     * Получение карточки книги по id
     * Карточка книги: карточка как на главной странице ID название, автор, обложка(blob)
     *
     * @param id id книги
     */
    @GetMapping
    @RequestMapping("/small/{id}")
    public List<BookSmallDto> getSmallCards(@PathVariable("id") Long id) {
        return bookService.getAllSmallBooksByDiscipline(id);
    }

    /**
     * Получение  похожих карточек книг по id книги
     * Карточка книги: карточка как на главной странице ID название, автор, обложка(blob)
     *
     * @param id id книги
     *
     */
    @GetMapping
    @RequestMapping("/getSimilarById/{id}/{count}")
    public List<BookSmallDto> getSimilarById(@PathVariable("id") Long id, @PathVariable("count") int count) {
        return bookService.getSimilarSmallBook(id,count);
    }


    /**
     * @param id id книги с которой требуется получить оглавление
     * @return  Массив книг в формате Base64 как и обложка
     * @throws IOException Если не найдена обложка
     */
    @GetMapping
    @RequestMapping("/getToc/{id}")
    public List<String> getToc(@PathVariable("id") Long id) throws IOException {
        return bookService.getToc(id);
    }
}