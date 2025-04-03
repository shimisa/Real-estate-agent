package com.example.userauth.userservice.email;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.Session;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Authenticator;

import java.util.Properties;

/**
 * Service for sending emails.
 *
 * @author Shimi
 * @version 1.0
 * @since 3/13/2022
 */
@Service
public class EmailService implements EmailSender {
    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    @Value("${email.username}")
    private String USERNAME;

    @Value("${email.password}")
    private String PASSWORD;

    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final String SMTP_PORT = "587";
    private static final String FROM_EMAIL = "dira@gmail.com";
    private static final String SUBJECT = "Dira - Email Confirmation";

    @Override
    @Async
    public void send(String to, String email) {
        try {
            Message message = createEmailMessage(to, email);
            Transport.send(message);
            LOGGER.info("Email sent to {}", to);
        } catch (MessagingException e) {
            LOGGER.error("Issues sending email to {}", to, e);
        }
    }

    private Message createEmailMessage(String to, String email) throws MessagingException {
        Session session = createEmailSession();
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(FROM_EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject(SUBJECT);
        message.setText(email);
        return message;
    }

    private Session createEmailSession() {
        Properties prop = new Properties();
        prop.put("mail.smtp.host", SMTP_HOST);
        prop.put("mail.smtp.port", SMTP_PORT);
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true"); // TLS

        return Session.getInstance(prop, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, PASSWORD);
            }
        });
    }

    /**
     * Builds the email content.
     *
     * @param name the recipient's name
     * @param link the confirmation link
     * @return the email content
     */
    public String buildEmail(String name, String link) {
        return String.format("Hello %s, \n Please confirm your email in the link below :) \n %s", name, link);
    }
}