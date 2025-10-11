package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.StudentInvitationCSVProcessRequestDto;
import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.csv.CSVHeaders;
import com.agh.polymorphia_backend.service.csv.CSVType;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import com.agh.polymorphia_backend.service.invitation.InvitationService;
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
    private final static String EMAIL_WITHOUT_INDEX_NUMBER = "Email doesn't contain index number";
    private final static String TOO_MANY_EMAILS = "Attempt to send too many emails!";
    private final InvitationService invitationService;

    @Value("${invitation.allow-multiple-emails}")
    private boolean allowMultipleEmails;

    public void process(StudentInvitationCSVProcessRequestDto request) {
        List<String> headers = request.getCsvHeaders();

        int emailIdx = CSVUtil.getColumnIndex(headers, CSVHeaders.EMAIL);
        int firstNameIdx = CSVUtil.getColumnIndex(headers, CSVHeaders.LAST_NAME);
        int lastNameIdx = CSVUtil.getColumnIndex(headers, CSVHeaders.FIRST_NAME);

        if (!allowMultipleEmails && request.getData().size() > 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, TOO_MANY_EMAILS);
        }

        for (List<String> row : request.getData()) {
            String email = row.get(emailIdx);
            String firstName = row.get(firstNameIdx);
            String lastName = row.get(lastNameIdx);
            Integer indexNumber = extractIndexNumberFromEmail(email);

            InvitationRequestDTO inviteDto = InvitationRequestDTO.builder()
                    .email(email)
                    .firstName(firstName)
                    .lastName(lastName)
                    .indexNumber(indexNumber)
                    .courseId(request.getCourseId())
                    .role(UserType.STUDENT)
                    .build();

            invitationService.inviteUser(inviteDto);
        }
    }

    private Integer extractIndexNumberFromEmail(String email) {
        String beforeAt = email.split("@")[0];

        try {
            return Integer.parseInt(beforeAt);
        } catch (NumberFormatException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, EMAIL_WITHOUT_INDEX_NUMBER);
        }
    }
}
