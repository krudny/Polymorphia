package com.agh.polymorphia_backend.service.csv;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVType;
import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.agh.polymorphia_backend.service.csv.processors.CSVProcessor;
import com.agh.polymorphia_backend.service.mapper.GeneralMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;

@Service
public class CSVService {
    private final GeneralMapper generalMapper;
    private final Map<CSVType, CSVProcessor> processors;

    public CSVService(GeneralMapper generalMapper, List<CSVProcessor> processorList) {
        this.generalMapper = generalMapper;
        this.processors = processorList.stream()
                .collect(Collectors.toMap(
                        CSVProcessor::getSupportedType,
                        processor -> processor
                ));
    }

    public CSVResult readCSV(MultipartFile file, CSVReadMode mode) {
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

            if (mode == CSVReadMode.HEADERS_ONLY) {
                return new CSVResult(headers, null);
            }

            List<String[]> records = new ArrayList<>();
            String[] record;

            while ((record = csvReader.readNext()) != null) {
                records.add(record);
            }

            if (mode == CSVReadMode.DATA_ONLY) {
                return new CSVResult(null, records);
            }

            return new CSVResult(headers, records);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error during CSV parsing");
        }
    }

    public HeadersResponseDto getHeaders(MultipartFile file, String type) {
        CSVType csvType;

        try {
            csvType = CSVType.valueOf(type.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid CSV type: " + type);
        }

        String[] requiredHeaders = csvType.getRequiredHeaders().toArray(String[]::new);
        String[] fileHeaders = readCSV(file, CSVReadMode.HEADERS_ONLY).headers();

        return HeadersResponseDto
                .builder()
                .requiredHeaders(requiredHeaders)
                .fileHeaders(fileHeaders)
                .build();
    }

    public CSVResult getPreview(CSVPreviewRequestDto request) {
        Map<String, String> headers = generalMapper.stringToMap(request.getHeaders());
        CSVResult csv = readCSV(request.getFile(), CSVReadMode.ALL);

        List<Integer> indices = headers.values().stream()
                .map(header -> CSVUtil.getColumnIndex(csv.headers(), header))
                .toList();

        if (indices.contains(-1)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected header not present in CSV");
        }

        String[] previewHeaders = headers.keySet().toArray(new String[0]);

        List<String[]> previewData = csv.data().stream()
                .map(row -> indices.stream()
                .mapToInt(i -> i)
                .mapToObj(i -> row[i])
                .toArray(String[]::new))
                .toList();

        return new CSVResult(previewHeaders, previewData);
    }

    public void processCSV(CSVProcessRequestDto request) {
        CSVType csvType = CSVType.valueOf(request.getType().toUpperCase());
        CSVProcessor processor = processors.get(csvType);

        if (processor == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No processor found for type: " + csvType);
        }

        processor.process(request);
    }
}
