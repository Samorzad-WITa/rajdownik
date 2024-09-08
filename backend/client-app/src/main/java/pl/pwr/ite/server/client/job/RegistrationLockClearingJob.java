package pl.pwr.ite.server.client.job;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.pwr.ite.server.service.ClockService;
import pl.pwr.ite.server.service.RegistrationLockService;
import pl.pwr.ite.server.service.TransactionalService;

@Component
@RequiredArgsConstructor
@Slf4j
public class RegistrationLockClearingJob {

    private final TransactionalService transactionalService;
    private final RegistrationLockService registrationLockService;
    private final ClockService clockService;

    @Scheduled(fixedDelay = 1 * 1000)
    public void executeJob() {
        var locks = registrationLockService.getAllInOngoingRegistration(clockService.getCurrentTime());
        if(locks.isEmpty()) {
            return;
        }
        log.info("Starting registration lock clearing job");
        var iterator = locks.iterator();
        while(iterator.hasNext()) {
            var lock = iterator.next();
            if(lock.getExpiresAt().isBefore(clockService.getCurrentTime())) {
                log.info("Lock {} is expired. Releasing...", lock.getId());
                registrationLockService.delete(lock);
            }
        }
    }
}
