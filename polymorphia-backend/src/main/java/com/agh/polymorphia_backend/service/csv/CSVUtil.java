package com.agh.polymorphia_backend.service.csv;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class CSVUtil {
    private static final String COLUMN_NOT_FOUND = "Column not found";
    private static final String EMPTY_FILE = "File is empty or null";
    private static final String FILE_CSV = "File must have .csv extension";
    private static final String FILE_TOO_LARGE = "File too large. Maximum allowed size is 5MB";

    public static int getColumnIndex(List<String> headers, String columnName) {
        int index = headers.stream()
                .map(String::toLowerCase)
                .toList()
                .indexOf(columnName.toLowerCase());

        if (index == -1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, COLUMN_NOT_FOUND);
        }

        return index;
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, EMPTY_FILE);
        }

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.endsWith(".csv")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FILE_CSV);
        }

        long maxSize = 5 * 1024 * 1024;
        if (file.getSize() > maxSize) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, FILE_TOO_LARGE);
        }
    }

    public static List<String> extractSelectedColumns(List<String> row, List<Integer> indices) {
        return indices.stream()
                .map(row::get)
                .toList();
    }
}
