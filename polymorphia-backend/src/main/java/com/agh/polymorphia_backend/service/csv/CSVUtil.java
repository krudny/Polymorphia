package com.agh.polymorphia_backend.service.csv;

import java.util.Arrays;

public class CSVUtil {
    public static int getColumnIndex(String[] headers, String columnName) {
        return Arrays.asList(headers).indexOf(columnName);
    }
}
