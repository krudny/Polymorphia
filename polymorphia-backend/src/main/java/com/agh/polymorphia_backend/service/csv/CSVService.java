package com.agh.polymorphia_backend.service.csv;

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
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class CSVService {

    public List<String[]> readCSV(MultipartFile file, String type) {
        List<String[]> records = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVReader csvReader = new CSVReaderBuilder(reader)
                     .withCSVParser(new CSVParserBuilder()
                             .withSeparator(',')
                             .withIgnoreQuotations(false)
                             .build())
                     .withSkipLines(1)
                     .build()) {

            String[] record;
            while ((record = csvReader.readNext()) != null) {
                records.add(record);
            }

        } catch (Exception e) {
            System.out.println("Błąd parsowania CSV: " + e.getMessage() + e);
        }

        return records;
    }
}

