package ru.TexTeam.TexTom.controllers;
import ru.TexTeam.TexTom.services.BookService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.core.io.Resource;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class FileController {
    @Value("${pdf.directory.path}")
    private String pdfDirectoryPath; // Путь к папке с PDF файлами
    @Value("${cover.directory.path}")
    private String coverDirectoryPath; // Путь к папке с обложками

    private final BookService bookService;

    public FileController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * Получить экземпляр pdf-файла книги
     * @param id Идентификатор нужной книги, соответствует названию файла книги
     * @return возвращает Байт-массив pdf файла книги
     */
    @GetMapping("/pdf/{id}")
    public ResponseEntity<Resource> getBookPdf(@PathVariable Long id) {
        String fileName = id + ".pdf"; // Формат имени файла
        File pdfFile = new File(pdfDirectoryPath, fileName);
        if (!pdfFile.exists()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null); // Возвращаем 404, если файл не найден
        }

        try {
            Path path = Paths.get(pdfFile.getAbsolutePath());
            ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + pdfFile.getName() + "\"")
                    .contentLength(pdfFile.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Возвращаем 500 в случае ошибки
        }
    }

    /**
     * Получить экземпляр обложки jpg указанной книги
     * @param id Идентификатор нужной книги, соответствует названию файла обложки
     * @return возвращает Байт-массив base64 обложки книги
     */
    @GetMapping("/cover/{id}")
    public ResponseEntity<String> getBookCover(@PathVariable Long id){
        String cover = bookService.getCoverBase64(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=cover")
                .contentLength(cover.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(cover);

    }

}
