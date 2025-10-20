package com.agh.polymorphia_backend.service.email;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.ForgotPasswordRequestDto;
import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final static String FAILED_TO_SEND_EMAIL = "Failed to send invitation email";
    private final static String INVITATION_TITLE = "Zaproszenie do aplikacji Polymorphia";
    private final static String RESET_PASSWORD = "Reset hasła";
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.from-name:Polymorphia}")
    private String fromName;

    @Value("${spring.mail.registerUrl}")
    private String registerUrl;

    public void sendInvitationEmail(CourseInvitationRequestDto inviteDTO, InvitationToken invitationToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(inviteDTO.getEmail());
            helper.setSubject(INVITATION_TITLE);

            Context context = new Context();
            String fullRegisterUrl = registerUrl + "?invitationToken=" + invitationToken.getToken();

            context.setVariable("registrationLink", fullRegisterUrl);
            context.setVariable("userRole", inviteDTO.getRole().getDisplayName().toUpperCase());

            String htmlContent = templateEngine.process("invitation", context);

            helper.setText(htmlContent, true);

            ClassPathResource imageResource = new ClassPathResource("templates/email-header.jpg");
            helper.addInline("headerImage", imageResource);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(FAILED_TO_SEND_EMAIL);
        }
    }

    public void sendForgotPasswordEmail(ForgotPasswordRequestDto requestDTO) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(requestDTO.getEmail());
            helper.setSubject(RESET_PASSWORD);

            Context context = new Context();
            String fullRegisterUrl = registerUrl + "forgot_password";

            context.setVariable("registrationLink", fullRegisterUrl);

            String htmlContent = templateEngine.process("forgot_password", context);

            helper.setText(htmlContent, true);

            ClassPathResource imageResource = new ClassPathResource("templates/email-header.jpg");
            helper.addInline("headerImage", imageResource);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(FAILED_TO_SEND_EMAIL);
        }
    }
}