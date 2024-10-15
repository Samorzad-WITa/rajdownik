package pl.pwr.ite.server.service.impl;

import com.opencsv.bean.CsvBindByPosition;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.service.UserImporter;
import pl.pwr.ite.server.service.UserService;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyAndShirtImporterImpl implements UserImporter {

    private final UserService userService;

    @Override
    public Collection<User> performImport(InputStream inputStream) {
        var importedUsers = new ArrayList<User>();
        var objects = loadObjects(inputStream);
        var iterator = objects.iterator();
        while(iterator.hasNext()) {
            var csvUser = iterator.next();
            var user = userService.findByEmail(csvUser.getEmail().trim());
            if(user == null) {
                continue;
            }
            user.setIceNumber(csvUser.getIceNumber());
            user = userService.saveAndFlush(user);
            importedUsers.add(user);
        }

        return importedUsers;
    }

    private List<CsvObject> loadObjects(InputStream csvInputStream) {
        try(Reader reader = new InputStreamReader(csvInputStream)) {
            var beanBuilder = new CsvToBeanBuilder<CsvObject>(reader)
                    .withType(CsvObject.class)
                    .withSkipLines(1)
                    .build();
            return beanBuilder.parse();
        } catch (IOException ex) {
            throw new IllegalArgumentException("Could not process csv file.", ex);
        }
    }

    @Data
    public static class CsvObject {

        @CsvBindByPosition(position = 3)
        private String email;

        @CsvBindByPosition(position = 10)
        private String iceNumber;
    }
}
