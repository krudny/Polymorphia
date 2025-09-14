package com.agh.polymorphia_backend.service.csv;

import java.util.List;

public class CSVUtil {
    public static int getColumnIndex(List<String> headers, String columnName) {
        return headers.indexOf(columnName);
    }

    public static boolean isValidEncoding(String[] headers) {
        if (headers == null) {
            return false;
        }

        String combined = String.join(" ", headers);

        boolean hasCorruptedChars = combined.contains("Ă") ||
                combined.contains("Ĺ") ||
                combined.contains("â€") ||
                combined.contains("Å") ||
                combined.contains("™") ||
                combined.contains("ï¿½");

        return !hasCorruptedChars;
    }
}
