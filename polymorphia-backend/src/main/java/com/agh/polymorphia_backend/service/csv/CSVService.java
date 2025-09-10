package com.agh.polymorphia_backend.service.csv;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVType;
import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.agh.polymorphia_backend.service.csv.processors.CSVProcessor;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.stream.Collectors;

@Service
public class CSVService {
    private final Map<CSVType, CSVProcessor> processors;

    public CSVService(List<CSVProcessor> processorList) {
        this.processors = processorList.stream()
                .collect(Collectors.toMap(
                        CSVProcessor::getSupportedType,
                        processor -> processor
                ));
    }

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

        String[] requiredHeaders = csvType.getRequiredHeaders().toArray(String[]::new);

        String[] fileHeaders = readCSV(file, type, CSVReadMode.HEADERS_ONLY).headers();

        return HeadersResponseDto
                .builder()
                .requiredHeaders(requiredHeaders)
                .fileHeaders(fileHeaders)
                .build();
    }

    public CSVResult getPreview(CSVPreviewRequestDto request) {
        MultipartFile file = request.getFile();
        String type = request.getType();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> headers;
        try {
            headers = mapper.readValue(request.getHeaders(), Map.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid headers JSON: " + e.getMessage());
        }

        CSVResult csv = readCSV(file, type, CSVReadMode.ALL);

        int[] indices = headers.values().stream()
                .mapToInt(header -> Arrays.asList(csv.headers()).indexOf(header))
                .toArray();

        String[] newHeaders = headers.keySet().toArray(new String[0]);

        System.out.println("=== CSV PREVIEW DEBUG ===");
        System.out.println("Original headers: " + Arrays.toString(csv.headers()));
        System.out.println("Header mapping: " + headers);
        System.out.println("Found indices: " + Arrays.toString(indices));
        System.out.println("New headers: " + Arrays.toString(newHeaders));
        System.out.println("Original data rows: " + csv.data().size());

        List<String[]> newData = csv.data().stream()
                .map(row -> Arrays.stream(indices).mapToObj(i -> row[i]).toArray(String[]::new))
                .collect(Collectors.toList());

        System.out.println("New data rows: " + newData.size());
        System.out.println("First 3 rows preview:");
        for (int i = 0; i < Math.min(3, newData.size()); i++) {
            System.out.println("  Row " + i + ": " + Arrays.toString(newData.get(i)));
        }
        System.out.println("========================");

        return new CSVResult(newHeaders, newData);
    }

    public void processCSV(CSVProcessRequestDto request) {
        CSVType csvType = CSVType.valueOf(request.getType().toUpperCase());

        CSVProcessor processor = processors.get(csvType);
        if (processor == null) {
            throw new IllegalArgumentException("No processor found for type: " + csvType);
        }

        processor.process(request);
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
