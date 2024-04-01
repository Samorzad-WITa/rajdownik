package pl.pwr.ite.server.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public interface ClockService {
    LocalDateTime getCurrentTime();

    Date getCurrentDate();
}
