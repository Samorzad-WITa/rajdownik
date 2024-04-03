package pl.pwr.ite.server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.service.MailingService;

@Service
@RequiredArgsConstructor
public class MailingServiceImpl implements MailingService {

    private final JavaMailSender mailSender;

    @Override
    public void send(String subject, String content, User user) {
        var message = new SimpleMailMessage();
        message.setFrom("rajdownik-dev@w4.pl");
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(content);
        mailSender.send(message);
    }
}
