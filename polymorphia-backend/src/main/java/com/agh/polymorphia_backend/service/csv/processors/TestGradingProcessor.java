package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.service.csv.CSVType;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TestGradingProcessor implements CSVProcessor {

    @Override
    public CSVType getSupportedType() {
        return CSVType.GRADE_IMPORT;
    }

    @Override
    public void process(CSVProcessRequestDto request) {
        List<String> headers = request.getCsvHeaders();

        int indexColumnIndex = CSVUtil.getColumnIndex(headers,"Numer indeksu");
        int gradeColumnIndex = CSVUtil.getColumnIndex(headers,"Ocena");

        // TODO: logic
    }
}
