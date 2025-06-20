package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    @Query("select e from Author e where e.id in :ids")
    List<Author> findAllByIdMatches(@Param("ids") List<Long> ids);

    @Query(value = "select e from Author e where e.full_name LIKE %:name% LIMIT :limit", nativeQuery = true)
    List<Author> findAllByFullNameContainingLimit(@Param("name") String name);


    List<Author> findAllByFullNameContaining( String fullName);
}