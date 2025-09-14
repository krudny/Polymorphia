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
        try (DecodedInputStreamReader reader = Chardet.decode(file.getInputStream(), StandardCharsets.UTF_8)) {

            CsvParserSettings settings = new CsvParserSettings();
            settings.getFormat().setDelimiter(';');
            settings.setHeaderExtractionEnabled(false);

            CsvParser parser = new CsvParser(settings);
            List<String[]> allRows = parser.parseAll(reader);

            if (allRows.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CSV is empty");
            }

            List<String> headers = Arrays.asList(allRows.getFirst());

            if (!CSVUtil.isValidEncoding(allRows.getFirst())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid encoding detected");
            }

            if (mode == CSVReadMode.HEADERS_ONLY) {
                return new CSVResponseDto(headers, null);
            }

            List<String[]> data = allRows.subList(1, allRows.size());

            if (mode == CSVReadMode.DATA_ONLY) {
                return new CSVResponseDto(null, data);
            }

            return new CSVResponseDto(headers, data);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Error during CSV parsing: " + e.getMessage());
        }
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

        String[] previewCSVHeaders = csvHeaders.keySet().toArray(new String[0]);

        List<String[]> previewCSVData = csv.data().stream()
                .map(row -> extractSelectedColumns(row, indices))
                .toList();

        return new CSVResponseDto(Arrays.asList(previewCSVHeaders), previewCSVData);
    }

    private String[] extractSelectedColumns(String[] row, List<Integer> indices) {
        return indices.stream()
                .mapToInt(i -> i)
                .mapToObj(i -> row[i])
                .toArray(String[]::new);
    }
}
