package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.CSVProcessRequestDto;
import com.agh.polymorphia_backend.service.csv.CSVType;
import org.springframework.stereotype.Component;

@Component
public class StudentInvitationProcessor implements CSVProcessor {

    @Override
    public CSVType getSupportedType() {
        return CSVType.STUDENT_INVITE;
    }

    @Override
    public void process(CSVProcessRequestDto request) {
        // TODO: logic
    }
}
