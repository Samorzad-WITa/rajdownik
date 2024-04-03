package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.User;

public interface MailingService {

    void send(String subject, String content, User user);
}
