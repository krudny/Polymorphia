package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.service.csv.CSVType;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import org.springframework.stereotype.Component;

@Component
public class TestGradingProcessor implements CSVProcessor {

    @Override
    public CSVType getSupportedType() {
        return CSVType.GRADE_IMPORT;
    }

    @Override
    public void process(CSVProcessRequestDto request) {
        String[] headers = request.getHeaders();

        int indexColumnIndex = CSVUtil.getColumnIndex(headers,"Numer indeksu");
        int gradeColumnIndex = CSVUtil.getColumnIndex(headers,"Ocena");

        for (String[] row : request.getData()) {
            String studentIndex = row[indexColumnIndex].trim();
            String gainedXP = row[gradeColumnIndex].trim();

            // TODO: this is temporary because we dont have grading logic and validation
            System.out.println("Przetworzono: " + studentIndex + " " + gainedXP);
        }
    }
}
