package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationCSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.user.StudentInvitationRequestDTO;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StudentInvitationCSVProcessor {
    private final UserService userService;

    @Value("${invitation.allow-multiple-emails}")
    private boolean allowMultipleEmails;

    public void process(StudentInvitationCSVProcessRequestDto request) {
        List<String> headers = request.getCsvHeaders();

        int emailIdx = CSVUtil.getColumnIndex(headers, "Email");
        int firstNameIdx = CSVUtil.getColumnIndex(headers, "Imię");
        int lastNameIdx = CSVUtil.getColumnIndex(headers, "Nazwisko");

        if (!allowMultipleEmails && request.getData().size() > 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attempt to send too many emails!");
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email doesn't contain index number");
        }
    }
}
