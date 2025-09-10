package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.response.csv.CSVType;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class TestGradingProcessor implements CSVProcessor {

    @Override
    public CSVType getSupportedType() {
        return CSVType.GRADE_IMPORT;
    }

    @Override
    public void process(CSVProcessRequestDto request) {
        CSVType csvType = CSVType.GRADE_IMPORT;

        Map<String, Integer> columnIndices = new HashMap<>();
        for (String requiredHeader : csvType.getRequiredHeaders()) {
            for (int i = 0; i < request.getHeaders().length; i++) {
                if (request.getHeaders()[i].equals(requiredHeader)) {
                    columnIndices.put(requiredHeader, i);
                    break;
                }
            }
        }

        Integer indexColumnIndex = columnIndices.get("Numer indeksu");
        Integer gradeColumnIndex = columnIndices.get("Ocena");

        for (String[] row : request.getData()) {
            String studentIndex = row[indexColumnIndex].trim();
            String gainedXP = row[gradeColumnIndex].trim();

            // Temporary
            System.out.println("Przetworzono: " + studentIndex + " " + gainedXP);
        }
    }
}
