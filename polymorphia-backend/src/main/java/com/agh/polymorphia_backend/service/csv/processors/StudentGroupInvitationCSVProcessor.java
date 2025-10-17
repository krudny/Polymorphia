package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.process.StudentGroupInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.GroupInvitationRequestDto;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.csv.CSVHeaders;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import com.agh.polymorphia_backend.service.invitation.InvitationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StudentGroupInvitationCSVProcessor {
    private final InvitationService invitationService;

    public void process(StudentGroupInvitationRequestDto request) {
        List<String> headers = request.getCsvHeaders();

        int emailIdx = CSVUtil.getColumnIndex(headers, CSVHeaders.EMAIL);

        for (List<String> row : request.getData()) {
            String email = row.get(emailIdx);

            GroupInvitationRequestDto groupInvitationRequestDto = GroupInvitationRequestDto.builder()
                    .email(email)
                    .role(UserType.STUDENT)
                    .courseGroupId(request.getCourseGroupId())
                    .build();

            invitationService.inviteUserToGroup(groupInvitationRequestDto);
        }
    }
}
