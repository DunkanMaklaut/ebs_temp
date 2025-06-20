package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.BookSmallDto;
import ru.TexTeam.TexTom.dto.FullSearchDto;
import ru.TexTeam.TexTom.dto.SearchSuggestion;
import ru.TexTeam.TexTom.entity.Author;
import ru.TexTeam.TexTom.entity.Book;
import ru.TexTeam.TexTom.repository.AuthorRepository;
import ru.TexTeam.TexTom.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class SearchService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final BookService bookService;

    public List<SearchSuggestion> bookSearch(String query, int limit) {
        List<Book> books = bookRepository.SearchBooksByNameOrIsbnOrAuthor(query,limit);
        List<SearchSuggestion> suggestions = new ArrayList<>();
        for (Book book : books) {
            String authors = "";
            for (Author author : book.getAuthors()
            ) {
                authors.concat( author.getFullName() + " " );
            }
            suggestions.add(new SearchSuggestion(book.getId(), book.getName() + ','+ authors, "book"));
        }
        return suggestions;
    }

    public List<SearchSuggestion> authorSearch(String query, int limit) {
        List<Author> authors = authorRepository.findAllByFullNameContaining(query);
        List<SearchSuggestion> suggestions = new ArrayList<>();
        for (Author author : authors) {
            suggestions.add(new SearchSuggestion(author.getId(), author.getFullName(), "author"));
        }
        return suggestions;
    }


    public List<SearchSuggestion> smallSearch(String query, int limit){
        List<SearchSuggestion> list = bookSearch(query, limit);
        list.addAll(authorSearch(query, limit));
        return list;
    }

    public FullSearchDto fullSearch(String query){
        List<BookSmallDto> books = bookService
                .booksToListSmallBookDto(bookRepository.SearchBooksByNameOrIsbnOrAuthor(query));
        return new FullSearchDto(
                books
                //authorRepository.findAllByFullNameContaining(query)
        );

    }
}
