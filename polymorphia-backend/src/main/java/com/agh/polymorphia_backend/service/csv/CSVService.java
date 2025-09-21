package com.agh.polymorphia_backend.service.csv;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVHeadersResponseDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVResponseDto;
import com.agh.polymorphia_backend.service.mapper.GeneralMapper;
import com.sigpwned.chardet4j.Chardet;
import com.sigpwned.chardet4j.io.DecodedInputStreamReader;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class CSVService {
    private final GeneralMapper generalMapper;

    public CSVResponseDto readCSV(MultipartFile file, CSVReadMode mode) {
        CSVUtil.validateCSV(file);

        try (DecodedInputStreamReader reader = Chardet.decode(file.getInputStream(), StandardCharsets.UTF_8)) {
            CsvParserSettings settings = new CsvParserSettings();
            settings.getFormat().setDelimiter(';');
            settings.setHeaderExtractionEnabled(false);

            CsvParser parser = new CsvParser(settings);
            List<String[]> rawRows = parser.parseAll(reader);

            if (!CSVUtil.isValidEncoding(rawRows)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid encoding detected");
            }

            List<List<String>> allRows = rawRows.stream()
                    .map(Arrays::asList)
                    .toList();

            return buildCSVResponse(mode, allRows);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error during CSV parsing");
        }
    }

    private CSVResponseDto buildCSVResponse(CSVReadMode mode, List<List<String>> allRows) {
        List<String> headers = allRows.getFirst();
        List<List<String>> data = allRows.subList(1, allRows.size());

        return switch (mode) {
            case HEADERS_ONLY -> CSVResponseDto.builder().csvHeaders(headers).build();
            case DATA_ONLY -> CSVResponseDto.builder().data(data).build();
            case ALL -> CSVResponseDto.builder()
                    .csvHeaders(headers)
                    .data(data)
                    .build();
        };
    }

    public CSVHeadersResponseDto getCSVHeaders(MultipartFile file, CSVType type) {
        List<String> requiredHeaders = new ArrayList<>(type.getRequiredCSVHeaders());
        List<String> fileHeaders = readCSV(file, CSVReadMode.HEADERS_ONLY).csvHeaders();

        return CSVHeadersResponseDto
                .builder()
                .requiredCSVHeaders(requiredHeaders)
                .fileCSVHeaders(fileHeaders)
                .build();
    }

    public CSVResponseDto getCSVPreview(CSVPreviewRequestDto request) {
        Map<String, String> csvHeaders = generalMapper.stringToMap(request.getCsvHeaders());
        CSVResponseDto csv = readCSV(request.getFile(), CSVReadMode.ALL);

        List<Integer> indices = csvHeaders.values().stream()
                .map(csvHeader -> CSVUtil.getColumnIndex(csv.csvHeaders(), csvHeader))
                .toList();

        if (indices.contains(-1)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected header not present in CSV");
        }

        List<String> previewCSVHeaders = new ArrayList<>(csvHeaders.keySet());

        List<List<String>> previewCSVData = csv.data().stream()
                .map(row -> CSVUtil.extractSelectedColumns(row, indices))
                .toList();

        return CSVResponseDto.builder()
                .csvHeaders(previewCSVHeaders)
                .data(previewCSVData)
                .build();
    }
}
