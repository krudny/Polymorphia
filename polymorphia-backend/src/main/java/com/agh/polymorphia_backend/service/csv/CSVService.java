package com.agh.polymorphia_backend.service.csv;

import com.agh.polymorphia_backend.dto.response.csv.CSVType;
import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class CSVService {
    public CSVResult readCSV(MultipartFile file, String type, CSVReadMode mode) {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), Charset.forName("ISO-8859-2")));
             CSVReader csvReader = new CSVReaderBuilder(reader)
                     .withCSVParser(new CSVParserBuilder()
                             .withSeparator(';')
                             .withIgnoreQuotations(false)
                             .build())
                     .withSkipLines(0)
                     .build()) {

            String[] headers = csvReader.readNext();
//            if (!validateHeaders(headers, type)) {
//                System.out.println("Walidacja nagłówków nieudana");
//                return new CSVResult(null, new ArrayList<>());
//            }

            if (mode == CSVReadMode.HEADERS_ONLY) {
                return new CSVResult(headers, new ArrayList<>());
            }

            List<String[]> records = new ArrayList<>();
            String[] record;

            while ((record = csvReader.readNext()) != null) {
                records.add(record);
            }

            return switch (mode) {
                case DATA_ONLY -> new CSVResult(null, records);
                default -> new CSVResult(headers, records);
            };

        } catch (Exception e) {
            System.out.println("Błąd parsowania CSV: " + e.getMessage());
            return new CSVResult(null, new ArrayList<>());
        }
    }

    public HeadersResponseDto getHeaders(MultipartFile file, String type) {
        CSVType csvType = CSVType.valueOf(type.toUpperCase());

        String[] requiredHeaders = csvType.getRequiredHeaders().stream()
                .map(String::toLowerCase)
                .toArray(String[]::new);

        String[] fileHeaders = readCSV(file, type, CSVReadMode.HEADERS_ONLY).headers();

        return HeadersResponseDto
                .builder()
                .requiredHeaders(requiredHeaders)
                .fileHeaders(fileHeaders)
                .build();
    }

    private boolean validateHeaders(String[] headers, String type) {
        if (headers == null || headers.length == 0) {
            System.out.println("Plik CSV jest pusty lub nie zawiera nagłówków");
            return false;
        }

        try {
            CSVType csvType = CSVType.valueOf(type.toUpperCase());

            Set<String> fileHeaders = Set.of(Arrays.stream(headers)
                    .map(String::toLowerCase)
                    .map(String::trim)
                    .toArray(String[]::new));

            Set<String> requiredHeaders = Set.of(csvType.getRequiredHeaders().stream()
                    .map(String::toLowerCase)
                    .toArray(String[]::new));

            System.out.println("file headers" + fileHeaders);
            System.out.println("required headers" + requiredHeaders);

            if (!fileHeaders.containsAll(requiredHeaders)) {
                List<String> missingHeaders = new ArrayList<>();
                for (String required : requiredHeaders) {
                    if (!fileHeaders.contains(required)) {
                        missingHeaders.add(required);
                    }
                }
                System.out.println("Brakujące nagłówki: " + missingHeaders);
                return false;
            }


            return true;

        } catch (IllegalArgumentException e) {
            System.out.println("Nieznany typ CSV: " + type);
            return false;
        }
    }
}
