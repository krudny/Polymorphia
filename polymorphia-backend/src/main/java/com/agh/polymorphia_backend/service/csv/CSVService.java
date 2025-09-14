package com.agh.polymorphia_backend.service.csv;

import com.agh.polymorphia_backend.dto.request.csv.CSVPreviewRequestDto;
import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVResponseDto;
import com.agh.polymorphia_backend.dto.response.csv.HeadersResponseDto;
import com.agh.polymorphia_backend.service.csv.processors.CSVProcessor;
import com.agh.polymorphia_backend.service.mapper.GeneralMapper;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import org.apache.commons.io.ByteOrderMark;
import org.apache.commons.io.input.BOMInputStream;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public CSVResponseDto readCSV(MultipartFile file, CSVReadMode mode) {
        Charset detectedCharset = CSVUtil.detectCharset(file);

        Charset[] charsetsToTry = {
                detectedCharset,
                StandardCharsets.UTF_8,
                Charset.forName("windows-1250"),
                Charset.forName("ISO-8859-2"),
                StandardCharsets.ISO_8859_1
        };

        Exception lastException = null;

        for (Charset charset : charsetsToTry) {
            try (BOMInputStream bomIn = BOMInputStream.builder()
                    .setInputStream(file.getInputStream())
                    .setInclude(false)
                    .setByteOrderMarks(ByteOrderMark.UTF_8, ByteOrderMark.UTF_16BE,
                            ByteOrderMark.UTF_16LE, ByteOrderMark.UTF_32BE, ByteOrderMark.UTF_32LE)
                    .get();
                 BufferedReader reader = new BufferedReader(new InputStreamReader(bomIn, charset));
                 CSVReader csvReader = new CSVReaderBuilder(reader)
                         .withCSVParser(new CSVParserBuilder()
                                 .withSeparator(';')
                                 .withIgnoreQuotations(false)
                                 .build())
                         .withSkipLines(0)
                         .build()) {

                // TODO: list
                String[] headers = csvReader.readNext();

                if (!CSVUtil.isValidEncoding(headers)) {
                    continue;
                }

                if (mode == CSVReadMode.HEADERS_ONLY) {
                    return new CSVResponseDto(Arrays.asList(headers), null);
                }

                List<String[]> records = new ArrayList<>();
                String[] record;

                while ((record = csvReader.readNext()) != null) {
                    records.add(record);
                }

                if (mode == CSVReadMode.DATA_ONLY) {
                    return new CSVResponseDto(null, records);
                }

                return new CSVResponseDto(Arrays.asList(headers), records);

            } catch (Exception e) {
                lastException = e;
                System.out.println("Failed to read CSV with charset " + charset.name() + ": " + e.getMessage());
                continue;
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Error during CSV parsing with all attempted charsets. Last error: " +
                        (lastException != null ? lastException.getMessage() : "Unknown error"));
    }


    public HeadersResponseDto getHeaders(MultipartFile file, String type) {
        CSVType csvType;

        try {
            csvType = CSVType.valueOf(type.toUpperCase().trim());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid CSV type: " + type);
        }

        List<String> requiredHeaders = new ArrayList<>(csvType.getRequiredHeaders());
        List<String> fileHeaders = readCSV(file, CSVReadMode.HEADERS_ONLY).headers();

        return HeadersResponseDto
                .builder()
                .requiredHeaders(requiredHeaders)
                .fileHeaders(fileHeaders)
                .build();
    }

    public CSVResponseDto getPreview(CSVPreviewRequestDto request) {
        Map<String, String> headers = generalMapper.stringToMap(request.getHeaders());
        CSVResponseDto csv = readCSV(request.getFile(), CSVReadMode.ALL);

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

        return new CSVResponseDto(Arrays.asList(previewHeaders), previewData);
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
