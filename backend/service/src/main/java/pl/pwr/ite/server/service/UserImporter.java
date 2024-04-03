package pl.pwr.ite.server.service;

import pl.pwr.ite.server.model.entity.User;

import java.io.InputStream;
import java.util.Collection;

public interface UserImporter {

    Collection<User> performImport(InputStream inputStream);
}
