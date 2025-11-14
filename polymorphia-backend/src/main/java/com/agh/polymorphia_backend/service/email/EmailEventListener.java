package com.agh.polymorphia_backend.service.email;

import com.agh.polymorphia_backend.model.email_event.CourseInvitationEvent;
import com.agh.polymorphia_backend.model.email_event.ForgotPasswordEvent;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@AllArgsConstructor
public class EmailEventListener {
    private final EmailService emailService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleForgotPassword(ForgotPasswordEvent event) {
        emailService.sendForgotPasswordEmail(event.getRequestDTO(), event.getToken());
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleCourseInvitation(CourseInvitationEvent event) {
        emailService.sendInvitationEmail(event.getInviteDTO(), event.getToken());
    }
}