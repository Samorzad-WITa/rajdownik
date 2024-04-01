package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import pl.pwr.ite.server.service.ClockService;

import java.time.LocalDateTime;
import java.util.Date;

@Service
public class ClockServiceImpl implements ClockService {
    @Override
    public LocalDateTime getCurrentTime() {
        return LocalDateTime.now();
    }

    @Override
    public Date getCurrentDate() {
        return new Date();
    }
}
