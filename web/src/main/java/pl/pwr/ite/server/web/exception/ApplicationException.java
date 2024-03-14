package pl.pwr.ite.server.web.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import java.util.Collections;
import java.util.Map;

@Getter
public class ApplicationException extends RuntimeException {

    private final ErrorDescriptor descriptor;
    private final HttpStatus status;
    private final String code;
    private final Map<String, Object> additionalInfo;
    private final BindingResult bindingResult;


    public ApplicationException(ErrorDescriptor descriptor, HttpStatus status, String message, String code, Map<String, Object> additionalInfo, BindingResult bindingResult, Throwable cause) {
        super(message, cause);
        this.descriptor = descriptor;
        this.status = status;
        this.code = code;
        this.additionalInfo = additionalInfo;
        this.bindingResult = bindingResult;
    }

    public ApplicationException(ErrorDescriptor descriptor) {
        this(descriptor, null, getMessage(null, descriptor), null, Collections.EMPTY_MAP, null, null);
    }

    public ApplicationException(ErrorDescriptor descriptor, Throwable cause) {
        this(descriptor, null, getMessage(null, descriptor), null, Collections.EMPTY_MAP, null, cause);
    }

    public ApplicationException(ErrorDescriptor descriptor, String message) {
        this(descriptor, null, getMessage(message, descriptor), null, Collections.EMPTY_MAP, null, null);
    }

    public ApplicationException(ErrorDescriptor descriptor, String message, Throwable cause) {
        this(descriptor, null, getMessage(message, descriptor), null, Collections.EMPTY_MAP, null, cause);
    }

    public ApplicationException(ErrorDescriptor descriptor, String message, Map<String, Object> additionalInfo, Throwable cause) {
        this(descriptor, null, getMessage(message, descriptor), null, additionalInfo, null, cause);
    }

    public ApplicationException(ErrorDescriptor descriptor, String message, BindingResult bindingResult) {
        this(descriptor, null, getMessage(message, descriptor), null, Collections.EMPTY_MAP, bindingResult, null);
    }

    protected static String getMessage(String message, ErrorDescriptor error) {
        if(message == null) {
            return error != null ? error.getDefaultMessage() : null;
        }
        return message;
    }
}
