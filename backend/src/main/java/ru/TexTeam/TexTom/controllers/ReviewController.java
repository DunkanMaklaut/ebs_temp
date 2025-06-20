package ru.TexTeam.TexTom.controllers;

import ru.TexTeam.TexTom.dto.CreateReviewDto;
import ru.TexTeam.TexTom.dto.ReviewInfoDto;
import ru.TexTeam.TexTom.services.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;
    /**
     * Метод принимает на вход DTO и создает запись отзыва в базе данных, с указанием даты
     * @param dto DTO для создания отзыва, содержащий id пользователя и книгиоценку и текст отзыва
     * @return "Success" у случае успеха, "A user has already left a review of this book"
     * в случае если отзыв на эту книгу уже был написан пользователем
     */
    @PostMapping("/set")
    public String setReview(@RequestBody CreateReviewDto dto) {
        return reviewService.setReview(dto);
    }

    /**
     * Получение отзывов на книгу
     * @param id книги
     * @return Список отзывов
     */
    @GetMapping("/{id}")
    public List<ReviewInfoDto> getReviewsByBook(@PathVariable("id") Long id){return reviewService.getReviewByBook(id);}
}
