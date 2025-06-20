package ru.TexTeam.TexTom.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {
    private static final String PASSWORD_PATTERN =
            "^(?=.*[0-9])" +               // как минимум 1 цифра
                    "(?=.*[!@#$%^&*])" +           //как минимум 1 спец. символ
                    "(?=.*[a-z])" +                 // как минимум 1 буква
                    "(?=.{8,20})" +                // длина от 8 до 20 символов
                    ".*$";

    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    public static boolean validate(String password) {
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }
}
