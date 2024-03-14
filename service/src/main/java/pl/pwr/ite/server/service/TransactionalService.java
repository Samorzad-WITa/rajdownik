package pl.pwr.ite.server.service;

public interface TransactionalService {

    interface CheckedRunnable<E extends Exception> {
        void run() throws E;
    }

    interface CheckedSupplier<R, E extends Exception> {
        R get() throws E;
    }

    <E extends Exception> void executeInNewTransaction(CheckedRunnable<E> runnable) throws E;
    <R, E extends Exception> R executeInNewTransaction(CheckedSupplier<R, E> supplier) throws E;

}
