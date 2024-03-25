package pl.pwr.ite.server.model.converter;

import jakarta.persistence.Converter;

import java.util.function.Function;

@Converter
public class PermissionGrantersConverter extends ArrayToStringConverter<String> {
    protected PermissionGrantersConverter() {
        super(String.class, ',', '\\', Function.identity(), Function.identity());
    }
}
