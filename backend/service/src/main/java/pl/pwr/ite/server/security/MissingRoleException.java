package pl.pwr.ite.server.security;

import org.springframework.security.core.AuthenticationException;

public class MissingRoleException extends AuthenticationException {

    public MissingRoleException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public MissingRoleException(String msg) {
        super(msg);
    }
}
