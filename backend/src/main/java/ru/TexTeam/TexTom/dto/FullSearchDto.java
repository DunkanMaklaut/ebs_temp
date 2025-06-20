package ru.TexTeam.TexTom.dto;

import ru.TexTeam.TexTom.entity.Author;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullSearchDto {
    private List<BookSmallDto> books;
   // private List<Author> authors;
}
