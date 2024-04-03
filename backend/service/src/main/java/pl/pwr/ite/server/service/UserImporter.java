package pl.pwr.ite.server.service;

import java.io.InputStream;

public interface UserImporter {

    void performImport(InputStream inputStream);
}
