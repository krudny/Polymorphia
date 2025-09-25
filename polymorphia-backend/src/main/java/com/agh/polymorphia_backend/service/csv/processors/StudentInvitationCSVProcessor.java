package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationCSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
@AllArgsConstructor
public class StudentInvitationCSVProcessor {
    private final UserService userService;

    public void process(StudentInvitationCSVProcessRequestDto request) {
        List<String> headers = request.getCsvHeaders();

        int emailIdx = CSVUtil.getColumnIndex(headers, "Email");
        int firstNameIdx = CSVUtil.getColumnIndex(headers, "Imię");
        int lastNameIdx = CSVUtil.getColumnIndex(headers, "Nazwisko");

        if (request.getData().size() > 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attempt to send to much emails!");
        }

        for (List<String> row : request.getData()) {
            String email = row.get(emailIdx);
            String firstName = row.get(firstNameIdx);
            String lastName = row.get(lastNameIdx);
            Integer indexNumber = extractIndexNumberFromEmail(email);

            StudentInvitationRequestDTO inviteDto = StudentInvitationRequestDTO.builder()
                    .email(email)
                    .firstName(firstName)
                    .lastName(lastName)
                    .indexNumber(indexNumber)
                    .build();

            userService.invite(inviteDto);
        }
    }

    private Integer extractIndexNumberFromEmail(String email) {
        String beforeAt = email.split("@")[0];

        try {
            return Integer.parseInt(beforeAt);
        } catch (NumberFormatException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email don't contain index numbers");
        }
    }
}
