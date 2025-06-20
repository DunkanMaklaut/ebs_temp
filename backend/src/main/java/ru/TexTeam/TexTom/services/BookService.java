package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.BookInfoDto;
import ru.TexTeam.TexTom.dto.BookSmallDto;
import ru.TexTeam.TexTom.dto.CreateBookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.io.IOUtils;
import ru.TexTeam.TexTom.entity.*;
import ru.TexTeam.TexTom.repository.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Stream;

@Service
@Transactional
public class BookService {
    @Value("${cover.directory.path}")
    private String coverDirectoryPath; // Путь к папке с обложками
    @Value("${toc.directory.path}")
    private String tocDirectoryPath;// Путь к папке с оглавлениями

    private final BookRepository bookRepository;
    private final BookPagingRepository bookPagingRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;
    private final DisciplineRepository disciplineRepository;
    private final PubTypeRepository pubTypeRepository;

    @Autowired
    public BookService(BookRepository bookRepository, BookPagingRepository bookPagingRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository, DisciplineRepository disciplineRepository, PubTypeRepository pubTypeRepository) {
        this.bookRepository = bookRepository;
        this.bookPagingRepository = bookPagingRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
        this.disciplineRepository = disciplineRepository;
        this.pubTypeRepository = pubTypeRepository;
    }

    public List<Book> getPagedBookByDiscipline(Long dis, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return bookPagingRepository.findAllByDisciplineId(dis, pageable);
    }

    public List<BookSmallDto> getPagedSmallBookByDiscipline(Long dis, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        List<Book> list = bookPagingRepository.findAllByDisciplineId(dis, pageable);
        List<BookSmallDto> smallDtos = new ArrayList<>();
        for (Book book : list) {
            BookSmallDto dto = bookToSmallBookDto(book);
            if (dto != null) {
                smallDtos.add(dto);
            }
        }
        return smallDtos;
    }


    public List<Book> getAllBooksByDiscipline(Long id) {
        return bookRepository.getBooksByDisciplineId(id);
    }

    public List<BookSmallDto> getAllSmallBooksByDiscipline(Long id) {
        List<Book> list = bookRepository.getBooksByDisciplineId(id);
        List<BookSmallDto> smallDtos = new ArrayList<>();
        for (Book book : list) {
            if (book != null) {
                smallDtos.add(bookToSmallBookDto(book));
            }
        }
        return booksToListSmallBookDto(bookRepository.getBooksByDisciplineId(id));


    }

    // Получить все книги
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<BookSmallDto> getRandomByCount(int count) {
        return booksToListSmallBookDto(bookRepository.getRandomBooksByCount(count));
    }

    public List<BookSmallDto> getRandomByCountInDiscipline(Long dis, int count) {
        return booksToListSmallBookDto(bookRepository.getRandomBooksByCountInDiscipline(dis, count));
    }

    // Найти книгу по id
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public BookInfoDto getBookInfoById(Long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        Book book;
        if (bookOptional.isPresent()) {
            book = bookOptional.get();
        } else {
            return new BookInfoDto();
        }
        BookInfoDto bookInfoDto = new BookInfoDto(book);
        bookInfoDto.setCoverSheet(getCoverBase64(book.getId()));
        return bookInfoDto;
    }

    // Создать новую книгу
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    // Обновить книгу
    public Book updateBook(Long id, Book updatedBook) {
        Optional<Book> existingBook = bookRepository.findById(id);

        if (existingBook.isPresent()) {
            /*Book book = existingBook.get();
            book.setName(updatedBook.getName());
            book.setAuthors(updatedBook.getAuthors());
            book.setPublisher(updatedBook.getPublisher());
            book.setDiscipline(updatedBook.getDiscipline());
            book.setFeatures(updatedBook.getFeatures());
            book.setContents(updatedBook.getContents());
            book.setAnnotation(updatedBook.getAnnotation());
            book.setPubType(updatedBook.getPubType());
            book.setYear(updatedBook.getYear());
            book.setPages(updatedBook.getPages());
            book.setIsbn(updatedBook.getIsbn());*/
            return bookRepository.save(updatedBook);
        } else {
            throw new NoSuchElementException("Book with id " + id + " not found");
        }
    }

    // Удалить книгу по id
    public void deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
        } else {
            throw new NoSuchElementException("Book with id " + id + " not found");
        }
    }

    public Book dtoToBook(CreateBookDto dto) {
        List<Author> authors = authorRepository.findAllByIdMatches(dto.getAuthors());
        Publisher publisher = publisherRepository.getReferenceById(dto.getPublisher());
        Discipline discipline = disciplineRepository.getReferenceById(dto.getDiscipline());
        PubType pubType = pubTypeRepository.getReferenceById(dto.getPubType());
        return new Book(dto.getName(), authors, publisher, discipline, pubType, dto.getYear(), dto.getPages(), dto.getIsbn());
    }

    public List<BookSmallDto> booksToListSmallBookDto(List<Book> list) {
        List<BookSmallDto> smallDtos = new ArrayList<>();
        for (Book book : list) {
            if (book != null) {
                smallDtos.add(bookToSmallBookDto(book));
            }
        }
        return smallDtos;
    }

    public BookSmallDto bookToSmallBookDto(Book book) {
        BookSmallDto bookSmallDto = new BookSmallDto();
        bookSmallDto.setId(book.getId());
        bookSmallDto.setAuthors(book.getAuthors());
        bookSmallDto.setName(book.getName());
        bookSmallDto.setCoverSheet(getCoverBase64(book.getId()));
        return bookSmallDto;
    }


    public String getCoverBase64(Long id) {
        String coverBase64 = "";
        try {
            Path path = Paths.get(coverDirectoryPath).resolve(id + ".jpg");
            if (!Files.exists(path)) {
                path = Paths.get(coverDirectoryPath).resolve("emptycover.jpg"); //Если не существует, возвращаем пустую обложку
            }
            ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

            byte[] coverBytes = IOUtils.toByteArray(resource.getInputStream());
            coverBase64 = Base64.getEncoder().encodeToString(coverBytes);

        } catch (IOException e) {
            System.out.println(e);
        }
        return coverBase64;
    }

    public List<String> getToc(Long id) throws IOException {

        List<String> tocList = new ArrayList<>();
        Path tocDir = Paths.get(tocDirectoryPath,id.toString() );

        if (!Files.exists(tocDir)) {
            throw new FileNotFoundException("Оглавление не найдено по пути: " + tocDir.toAbsolutePath());
        }

        try (Stream<Path> paths = Files.list(tocDir)) {
            List<Path> imageFiles = paths
                    .filter(path -> {
                        String filename = path.getFileName().toString().toLowerCase();
                        return filename.endsWith(".jpg") || filename.endsWith(".png");
                    })
                    .sorted((p1, p2) -> {
                        int num1 = extractPageNumber(p1.getFileName().toString());
                        int num2 = extractPageNumber(p2.getFileName().toString());
                        return Integer.compare(num1, num2);
                    })
                    .toList();

            for (Path path : imageFiles) {
                byte[] fileContent = Files.readAllBytes(path);
                tocList.add(Base64.getEncoder().encodeToString(fileContent));
            }
        } catch (IOException e) {
            throw new IOException("Ошибка чтения файлов в директории: " + tocDir, e);
        }

        return tocList;
    }

    private int extractPageNumber(String filename) {
        // Извлекаем число из имен вида "1.jpg", "2.jpg"
        String numStr = filename.replaceAll("[^0-9]", "");
        return numStr.isEmpty() ? 0 : Integer.parseInt(numStr);
    }
    public List<BookSmallDto> getSimilarSmallBook(Long id, int limit) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        if (optionalBook.isEmpty()) {
            throw new NoSuchElementException("Book with id " + id + " not found");
        }
        Book book = optionalBook.get();
        List<Keyword> list = book.getKeyWords();
        List<Long> ids = new ArrayList<>();
        for(Keyword keyword:list){
            ids.add(keyword.getId());
        }
        return booksToListSmallBookDto(bookRepository.findSimilarBooksByNameAndKeywordsAndDiscipline(book.getId(),book.getName(),book.getDiscipline().getId(),ids, limit));

    }
}

