package com.agh.polymorphia_backend.service.csv;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class CSVUtil {
    public static int getColumnIndex(List<String> headers, String columnName) {
        try {
            int index = headers.stream()
//                .filter(Objects::nonNull) -- nie zadziała
//                    .map(header -> {
//                        if (header == null){
//                            return null;
//                        }
//                        return header.toLowerCase();
//                    })
                    .map(String::toLowerCase)
                    .toList()
                    .indexOf(columnName.toLowerCase());

            if (index == -1) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Kolumna " + columnName + "nie została znaleziona w pliku."
                );
            }

            return index;
        } catch (NullPointerException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NPE");
        }
    }

    public static boolean isValidEncoding(List<String[]> data) {
        return data.stream()
                .flatMap(Arrays::stream)
                .filter(Objects::nonNull)
                .flatMapToInt(String::chars)
                .allMatch(c -> c <= 127 || isValidPolishChar((char) c));
    }

    private static boolean isValidPolishChar(char testedChar) {
        String polishChars = "ąćęłńóśźżĄĆĘŁŃÓŚŹŻ";
        return polishChars.indexOf(testedChar) != -1;
    }

    public static void validateCSV(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Plik jest pusty lub nie został podany.");
        }

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.endsWith(".csv")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Plik musi mieć rozszerzenie .csv");
        }

        long maxSize = 5 * 1024 * 1024;
        if (file.getSize() > maxSize) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Plik jest za duży. Maksymalny rozmiar to 5MB.");
        }
    }

    public static List<String> extractSelectedColumns(List<String> row, List<Integer> indices) {
        return indices.stream()
                .map(row::get)
                .toList();
    }
}
