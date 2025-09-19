package com.agh.polymorphia_backend.service.csv;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class CSVUtil {
    public static int getColumnIndex(List<String> headers, String columnName) {
        return headers.indexOf(columnName);
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
}
