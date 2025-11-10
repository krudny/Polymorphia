package com.agh.polymorphia_backend.model.email_event;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.model.token.Token;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CourseInvitationEvent {
    private final CourseInvitationRequestDto inviteDTO;
    private final Token token;
}
