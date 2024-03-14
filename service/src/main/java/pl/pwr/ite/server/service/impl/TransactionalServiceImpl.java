package pl.pwr.ite.server.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pl.pwr.ite.server.service.TransactionalService;

@Service
public class TransactionalServiceImpl implements TransactionalService {

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <E extends Exception> void executeInNewTransaction(CheckedRunnable<E> runnable) throws E {
        runnable.run();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public <R, E extends Exception> R executeInNewTransaction(CheckedSupplier<R, E> supplier) throws E {
        return supplier.get();
    }
}
