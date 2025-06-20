package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.dto.ReviewInfoDto;
import ru.TexTeam.TexTom.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsAllByUserIdAndBookId(Long userId, Long bookId);

    @Query("select new " +
            "ru.TexTeam.TexTom.dto.ReviewInfoDto(r.id, r.user.id, r.user.fullName, r.date, r.rating, r.text) " +
            "from Review r where r.book.id = :id")
    List<ReviewInfoDto> getReviewsByBookId(@Param("id")Long id);
}
