package com.agh.polymorphia_backend.service.email;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.dto.request.user.ForgotPasswordRequestDto;
import com.agh.polymorphia_backend.model.token.Token;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final static String FAILED_TO_SEND_EMAIL = "Nie udało się wysłać wiadomości z zaproszeniem.";
    private final static String INVITATION_TITLE = "Zaproszenie do aplikacji Polymorphia";
    private final static String RESET_PASSWORD = "Reset hasła";
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.from-name:Polymorphia}")
    private String fromName;

    @Value("${spring.mail.registerUrl}")
    private String baseUrl;

    public void sendInvitationEmail(CourseInvitationRequestDto inviteDTO, Token token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(inviteDTO.getEmail());
            helper.setSubject(INVITATION_TITLE);

            Context context = new Context();
            String fullBaseUrl = baseUrl + "?invitationToken=" + token.getToken();

            context.setVariable("registrationLink", fullBaseUrl);
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

    public void sendForgotPasswordEmail(ForgotPasswordRequestDto requestDTO, Token token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(requestDTO.getEmail());
            helper.setSubject(RESET_PASSWORD);

            Context context = new Context();
            String fullBaseUrl = baseUrl + "?forgotPasswordToken=" + token.getToken();

            context.setVariable("forgotPasswordLink", fullBaseUrl);

            String htmlContent = templateEngine.process("forgot_password", context);

            helper.setText(htmlContent, true);

            ClassPathResource imageResource = new ClassPathResource("templates/email-header.jpg");
            helper.addInline("headerImage", imageResource);

            mailSender.send(message);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_SEND_EMAIL);
        }
    }
}