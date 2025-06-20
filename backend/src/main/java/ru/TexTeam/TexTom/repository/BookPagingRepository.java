package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.Book;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookPagingRepository extends PagingAndSortingRepository<Book, Long> {

    List<Book> findAllByDisciplineId(Long dis, Pageable pageable);
}
