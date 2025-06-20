/*package com.example.ebs.controllers;

import com.example.ebs.dto.CreateReviewDto;
import com.example.ebs.dto.SetContractDto;
import com.example.ebs.entity.Organisation;
import com.example.ebs.entity.User;
import com.example.ebs.services.ContractAndUserService;
import com.example.ebs.services.RegisterService;
import com.example.ebs.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class AddData {
    @Autowired
    private RegisterService registerService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ContractAndUserService contractAndUserService;

    @GetMapping("/addData")
    public void LoadUsersAndReviews() throws ParseException {
        List<SetContractDto> setContractDtos = new ArrayList<>();
        SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
        setContractDtos.add(new SetContractDto(2L, new Date(), formatter.parse("01.09.2028") ));
        setContractDtos.add(new SetContractDto(3L,formatter.parse("01.09.2024"),formatter.parse("01.09.2028")));
        setContractDtos.add(new SetContractDto(4L,formatter.parse("01.09.2024"),formatter.parse("01.09.2025")));
        setContractDtos.add(new SetContractDto(5L,formatter.parse("01.09.2023"),formatter.parse("01.09.2024")));
        for (SetContractDto dto : setContractDtos) {
            System.out.println(contractAndUserService.setContract(dto));
        }





        /*List<RegisterDto> users = new ArrayList<>();
        users.add(new RegisterDto(2L,10001,"Иванов Иван Иванович",  "12345678", "ivanov@mail.ru" ));
        users.add(new RegisterDto(2L,10002,"Петрова Анна Сергеевна",  "12345678", "petrova@gmail.com"));
        users.add(new RegisterDto(2L,10003,"Сидоров Алексей Петрович",  "12345678", "sidorov@yandex.ru"));
        users.add(new RegisterDto(2L,10004,"Кузнецова Мария Дмитриевна",  "12345678", "kuznetsova@mail.com"));
        users.add(new RegisterDto(2L,10005,"Смирнов Дмитрий Алексеевич",  "12345678", "smirnov@gmail.ru"));
        users.add(new RegisterDto(2L,10006,"Васильева Екатерина Олеговна",  "12345678", "vasilieva@yandex.com"));
        users.add(new RegisterDto(2L,10007,"Попов Артём Игоревич",  "12345678", "popov@mail.ru"));
        users.add(new RegisterDto(2L,10008,"Лебедева Ольга Викторовна",  "00000000", "lebedeva@gmail.com"));
        users.add(new RegisterDto(2L,10009,"Козлов Михаил Сергеевич",  "00000000", "kozlov@yandex.ru"));
        users.add(new RegisterDto(2L,10010,"Новикова Анастасия Павловна",  "00000000", "novikova@mail.com"));
        users.add(new RegisterDto(2L,10011,"Морозов Андрей Николаевич",  "00000000", "morozov@gmail.ru"));
        users.add(new RegisterDto(2L,10012,"Павлова Виктория Александровна",  "00000000", "pavlova@yandex.com"));
        users.add(new RegisterDto(2L,10013,"Волков Игорь Денисович", "00000000", "volkov@mail.ru"));
        users.add(new RegisterDto(2L,10014,"Алексеева Татьяна Валерьевна",  "00000000", "alekseeva@gmail.com"));
        users.add(new RegisterDto(2L,10015,"Соколов Роман Евгеньевич",  "00000000", "sokolov@yandex.ru"));
        for (RegisterDto user : users) {
            System.out.println(registerService.register(user.getOrganisation().getId(), user.getLibraryCard(), user.getFullName(), user.getEmail(), user.getPassword()));
        }
        List<CreateReviewDto> reviews = new ArrayList<>();

        // Отзывы на книгу 2: "Программирование на Python, том I, 4-е издание"
        reviews.add(new CreateReviewDto(1L, 2L, 5, "Отличная книга для начинающих! Всё объясняется доступно, много примеров."));
        reviews.add(new CreateReviewDto(3L, 2L, 4, "Хороший учебник, но иногда не хватает глубины в объяснениях."));
        reviews.add(new CreateReviewDto(5L, 2L, 5, "Лучшее введение в Python! Рекомендую всем новичкам."));

        // Отзывы на книгу 3: "Изучаем С++ через программирование игр"
        reviews.add(new CreateReviewDto(2L, 3L, 5, "Очень интересный подход! Учу С++ и сразу применяю на практике в играх."));
        reviews.add(new CreateReviewDto(7L, 3L, 3, "Неплохо, но некоторые примеры слишком сложные для новичков."));
        reviews.add(new CreateReviewDto(9L, 3L, 4, "Книга мотивирует изучать C++. Игровые примеры делают обучение увлекательным."));

        // Отзывы на книгу 4: "Программирование и алгоритмизация"
        reviews.add(new CreateReviewDto(4L, 4L, 5, "Фундаментальный труд! Отлично подходит для подготовки к олимпиадам."));
        reviews.add(new CreateReviewDto(6L, 4L, 2, "Слишком академично, не хватает практических задач."));
        reviews.add(new CreateReviewDto(8L, 4L, 4, "Хорошая книга, но требует базовых знаний математики."));

        // Отзывы на книгу 5: "Архитектурно-строительный и дорожно-транспортный комплексы..."
        reviews.add(new CreateReviewDto(10L, 5L, 4, "Полезное издание для специалистов. Много актуальных данных."));
        reviews.add(new CreateReviewDto(12L, 5L, 3, "Интересно, но слишком много теории и мало практических кейсов."));

        // Отзывы на книгу 6: "Диагностирование технических систем: теория, примеры, задачи"
        reviews.add(new CreateReviewDto(11L, 6L, 5, "Отличный справочник! Много полезных примеров из реальной практики."));
        reviews.add(new CreateReviewDto(13L, 6L, 4, "Хорошая книга, но некоторые задачи требуют доработки."));

        // Отзывы на книгу 7: "Материаловедение: Технология конструкционных материалов"
        reviews.add(new CreateReviewDto(14L, 7L, 5, "Лучший учебник по материаловедению! Всё структурировано и понятно."));
        reviews.add(new CreateReviewDto(15L, 7L, 3, "Неплохо, но устаревшие данные в некоторых разделах."));

        // Отзывы на книгу 8: "Железобетонные и каменные конструкции"
        reviews.add(new CreateReviewDto(1L, 8L, 4, "Хороший справочник для инженеров. Много расчётных методик."));
        reviews.add(new CreateReviewDto(4L, 8L, 5, "Незаменимая книга в моей работе! Всё по ГОСТам и СНиПам."));

        // Отзывы на книгу 9: "Цифровые технологии"
        reviews.add(new CreateReviewDto(2L, 9L, 5, "Современный и актуальный материал! Отлично для студентов IT-направлений."));
        reviews.add(new CreateReviewDto(6L, 9L, 4, "Интересно, но хотелось бы больше практических примеров."));

        // Отзывы на книгу 10: "Научные исследования аспирантов: информатика и вычислительная техника"
        reviews.add(new CreateReviewDto(3L, 10L, 5, "Очень полезно для аспирантов! Много методик исследований."));
        reviews.add(new CreateReviewDto(7L, 10L, 4, "Хороший сборник статей, но не хватает структуры."));

        // Отзывы на книгу 11: "Разработка, исследование и оптимизация автоматизированных систем управления в среде MATLAB"
        reviews.add(new CreateReviewDto(5L, 11L, 5, "Отличная книга для инженеров! MATLAB разобран очень подробно."));
        reviews.add(new CreateReviewDto(9L, 11L, 3, "Сложновато для новичков, но полезно для продвинутых пользователей."));

        for (CreateReviewDto review : reviews) {
            System.out.println(reviewService.setReview(review));
        }
    }
}*/



/*
 ОмГТУ_Тест
Логин библиотекаря: 550-OmGTU_Test
Пароль библиотекаря: ega$:biKRb9V
Логин издателя: 551-OmGTU_Test
Пароль издателя: [^9bJ_a(4&cl

 ОмскийВУЗ
Логин библиотекаря: 550-OmskiyVUZ
Пароль библиотекаря: D*L@vael4U}P
Логин издателя: 551-OmskiyVUZ
Пароль издателя: -:]fX:x6#8kb

НовосибирскийВУЗ
Логин библиотекаря: 540-NovosibirskiyVUZ
Пароль библиотекаря: 3u(0gtSy4%+G
Логин издателя: 541-NovosibirskiyVUZ
Пароль издателя: jMhHwJ)C(3mu

ТюменскийВУЗ
Логин библиотекаря: 720-TyumenskiyVUZ
Пароль библиотекаря: CNG]1K2#adb^
Логин издателя: 721-TyumenskiyVUZ
Пароль издателя: j7@;aaX%Z4L&
*/
