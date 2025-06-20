package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.CreateReviewDto;
import ru.TexTeam.TexTom.dto.ReviewInfoDto;
import ru.TexTeam.TexTom.entity.Review;
import ru.TexTeam.TexTom.repository.BookRepository;
import ru.TexTeam.TexTom.repository.ReviewRepository;
import ru.TexTeam.TexTom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Service
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReviewService(ReviewRepository ratingRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.reviewRepository = ratingRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public String setReview(CreateReviewDto reviewDto){
        try {
            if (reviewRepository.existsAllByUserIdAndBookId(reviewDto.getUserId(), reviewDto.getBookId())) {
                throw new Exception("A user has already left a review of this book");
            }

            Review review = new Review();
            review.setUser(userRepository.getReferenceById(reviewDto.getUserId()));
            review.setBook(bookRepository.getReferenceById(reviewDto.getBookId()));
            review.setRating(reviewDto.getRating());
            review.setText(reviewDto.getText());
            review.setDate(new Date(System.currentTimeMillis()));
            reviewRepository.save(review);
        }catch (Exception e){
            e.printStackTrace();
            return "Error! A user has already left a review of this book!";
        }
        return "Review successfully added!";
    }

    public List<ReviewInfoDto> getReviewByBook(Long id){
        return  reviewRepository.getReviewsByBookId(id);
    }


}
