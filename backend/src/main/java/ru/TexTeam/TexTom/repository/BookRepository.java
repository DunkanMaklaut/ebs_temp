package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("select b from Book b order by Random() limit :count_")
    List<Book> getRandomBooksByCount(@Param("count_") int count);

    @Query("select b from Book b where b.discipline.id = :dis order by Random() LIMIT :count_")
    List<Book> getRandomBooksByCountInDiscipline(@Param("dis") Long dis, @Param("count_") int limit);

    //@Query("select b.id , b.name  from Book b where lower(b.name) like lower(%:query%) or lower(b.isbn) like lower(%:query%) ")
    List<Book> getBooksByNameContainingIgnoreCaseOrIsbnContainingIgnoreCase(String name, String isbn);

    List<Book> getBooksByDisciplineId(Long id);

    @Query(nativeQuery = true, value = """
            SELECT distinct b.*, a.full_name, similarity(b.name, :query) as similarity
                               FROM book b
                               inner join book_author ba on b.id = ba.book_id
                               inner join author a on a.id = ba.author_id
                               
                               WHERE  (b.name % :query or similarity(b.name, :query)>0.2) 
                               or b.isbn LIKE :query 
                               or (lower(a.full_name) 
                               Like lower(:query))
                               
                               order by similarity desc
                               LIMIT :limit
             """)
    List<Book> SearchBooksByNameOrIsbnOrAuthor(
            @Param("query") String query,
            @Param("limit") int limit

    );

    @Query(nativeQuery = true, value = """
            SELECT  distinct b.*, a.full_name, similarity(b.name, :query) as similarity
                                                                                    FROM book b
                                                                                    inner join book_author ba on b.id = ba.book_id
                                                                                    inner join author a on a.id = ba.author_id
                                                                                    WHERE  (b.name % :query or similarity(b.name, :query)>0.2) or b.isbn LIKE :query or (lower(a.full_name) Like lower(:query))
                                                                                    order by similarity desc
             """)
    List<Book> SearchBooksByNameOrIsbnOrAuthor(
            @Param("query") String query

    );


    @Query(nativeQuery = true, value = """
            SELECT distinct b.*, similarity(b.name, :name) as similarity
            FROM book b
            join book_keywords bk on b.id = bk.book_id
            WHERE  (b.name % :name
            or keyword_id in (:ids))
            and b.discipline_id = :dis
            and b.id != :currentId
            order by similarity desc
            LIMIT :limit
             """)
    List<Book> findSimilarBooksByNameAndKeywordsAndDiscipline(
            @Param("currentId") Long currentBookId,
            @Param("name") String name,
            @Param("dis") Long dis,
            @Param("ids") List<Long> keyWords,
            @Param("limit") int limit

    );

    @Query(nativeQuery = true, value =
            "SELECT distinct b.* " +
                    "FROM book b " +
                    "WHERE b.discipline_id = :dis AND b.name % :name " +
                    "LIMIT :limit ")
    List<Book> findSimilarBooks(
            @Param("name") String name,
            @Param("dis") Long dis,
            @Param("limit") int limit

    );


}
