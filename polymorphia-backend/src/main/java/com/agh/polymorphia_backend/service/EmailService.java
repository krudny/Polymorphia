package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.model.user.InvitationToken;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.from-name:Polymorphia}")
    private String fromName;

    public void sendInvitationEmail(String toEmail, InvitationToken invitationToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(toEmail);
            helper.setSubject("Zaproszenie do aplikacji Polymorphia");

            String htmlContent = buildInvitationEmailContent(invitationToken);

            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send invitation email");
        }
    }

    private String buildInvitationEmailContent(InvitationToken invitationToken) {
        String registrationLink = "https://polymorphia-self.vercel.app?invitationToken=" + invitationToken.getToken();


        return String.format("""
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Zaproszenie do Polymorphia</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f4f4f4;
                    }
                    
                    .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                    }
                    
                    .header {
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        padding: 30px 20px;
                        text-align: center;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                        margin-bottom: 5px;
                    }
                    
                    .header p {
                        font-size: 16px;
                        opacity: 0.9;
                    }
                    
                    .content {
                        padding: 40px 30px;
                    }
                    
                    .welcome-text {
                        font-size: 18px;
                        margin-bottom: 20px;
                        color: #2c3e50;
                    }
                    
                    .description {
                        font-size: 16px;
                        color: #555;
                        margin-bottom: 30px;
                        line-height: 1.7;
                    }
                    
                    .cta-container {
                        text-align: center;
                        margin: 40px 0;
                    }
                    
                    .cta-button {
                        display: inline-block;
                        padding: 15px 35px;
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        color: white;
                        text-decoration: none;
                        border-radius: 50px;
                        font-size: 16px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                    }
                    
                    .cta-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
                    }
                    
                    .info-box {
                        background: #f8f9fa;
                        border-left: 4px solid #667eea;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 5px;
                    }
                    
                    .info-box p {
                        margin: 0;
                        color: #495057;
                        font-size: 14px;
                    }
                    
                    .footer {
                        background: #f8f9fa;
                        padding: 25px 30px;
                        text-align: center;
                        border-top: 1px solid #e9ecef;
                    }
                    
                    .footer p {
                        margin: 5px 0;
                        color: #6c757d;
                        font-size: 13px;
                    }
                    
                    .logo {
                        font-size: 28px;
                        font-weight: bold;
                        letter-spacing: -1px;
                    }
                    
                    @media (max-width: 600px) {
                        .email-container {
                            margin: 10px;
                            border-radius: 5px;
                        }
                        
                        .content {
                            padding: 30px 20px;
                        }
                        
                        .header {
                            padding: 25px 20px;
                        }
                        
                        .cta-button {
                            padding: 12px 30px;
                            font-size: 15px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <div class="logo">🎯 Polymorphia</div>
                        <h1>Witaj w naszym zespole!</h1>
                        <p>Akademia Górniczo-Hutnicza</p>
                    </div>
                    
                    <div class="content">
                        <div class="welcome-text">
                            Cześć! 👋
                        </div>
                        
                        <div class="description">
                            Zostałeś/aś zaproszony/a do aplikacji <strong>Polymorphia</strong> - nowoczesnej platformy 
                            edukacyjnej AGH. Aby rozpocząć korzystanie z aplikacji, musisz utworzyć swoje konto.
                        </div>
                        
                        <div class="cta-container">
                            <a href="%s" class="cta-button">
                                🚀 Utwórz Konto
                            </a>
                        </div>
                        
                        <div class="info-box">
                            <p><strong>ℹ️ Ważne informacje:</strong></p>
                            <p>• Link aktywacyjny jest ważny przez <strong>24 godziny</strong></p>
                            <p>• Podczas rejestracji ustanowisz własne hasło</p>
                            <p>• Po rejestracji otrzymasz pełny dostęp do platformy</p>
                        </div>
                        
                        <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
                            Jeśli przycisk nie działa, skopiuj i wklej ten link do przeglądarki:<br>
                            <a href="%s" style="color: #667eea; word-break: break-all;">%s</a>
                        </p>
                    </div>
                    
                    <div class="footer">
                        <p><strong>Polymorphia Team</strong></p>
                        <p>Akademia Górniczo-Hutnicza im. Stanisława Staszica</p>
                        <p style="margin-top: 15px; font-size: 12px;">
                            Jeśli nie oczekiwałeś/aś tego zaproszenia, zignoruj tę wiadomość.
                        </p>
                        <p style="font-size: 12px; color: #adb5bd;">
                            © 2025 Polymorphia - Wszelkie prawa zastrzeżone
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """, registrationLink, registrationLink, registrationLink);
    }
}
