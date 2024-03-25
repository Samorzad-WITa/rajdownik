package pl.pwr.ite.server.web.exception;

import org.springframework.http.HttpStatus;

public interface ErrorDescriptor {

    HttpStatus getDefaultStatus();
    String getCode();
    String getDefaultMessage();
}
