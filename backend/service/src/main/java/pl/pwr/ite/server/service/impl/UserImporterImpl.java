package pl.pwr.ite.server.service.impl;

import com.opencsv.bean.CsvBindByPosition;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.pwr.ite.server.model.entity.User;
import pl.pwr.ite.server.model.entity.UserRole;
import pl.pwr.ite.server.model.enums.UserType;
import pl.pwr.ite.server.service.RoleService;
import pl.pwr.ite.server.service.UserImporter;
import pl.pwr.ite.server.service.UserRoleService;
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
public class UserImporterImpl implements UserImporter {

    private final UserService userService;
    private final UserRoleService userRoleService;
    private final RoleService roleService;

    @Override
    public Collection<User> performImport(InputStream inputStream) {
        var importedUsers = new ArrayList<User>();
        var objects = loadObjects(inputStream);
        var iterator = objects.iterator();
        while(iterator.hasNext()) {
            var csvUser = iterator.next();
            var user = userService.findByEmail(csvUser.getEmail());
            if(user == null) {
                user = new User();
                user.setType(UserType.Participant);
                user = userService.saveAndFlush(user);
                var role = roleService.findByCode("par");
                var userRole = new UserRole();
                userRole.setUser(user);
                userRole.setRole(role);
                userRoleService.save(userRole);
            }
            user.setFirstName(csvUser.getFirstName());
            user.setLastName(csvUser.getLastName());
            user.setEmail(csvUser.getEmail());
            user.setPhoneNumber(csvUser.getPhoneNumber());
            user.setIndexNumber(csvUser.getIndexNumber());
            user.setDietType(csvUser.getDietType());
            user.setCode(userService.generateCode(user));

            if(csvUser.getBusNumber().equals("Autokar - I tura")) {
                user.setBusNumber(1);
            } else if (csvUser.getBusNumber().equals("Autokar - II tura")) {
                user.setBusNumber(2);
            } else if (csvUser.getBusNumber().equals("Dojazd własny")) {
                user.setBusNumber(0);
            }
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

        @CsvBindByPosition(position = 0)
        private String firstName;

        @CsvBindByPosition(position = 1)
        private String lastName;

        @CsvBindByPosition(position = 2)
        private String email;

        @CsvBindByPosition(position = 3)
        private String phoneNumber;

        @CsvBindByPosition(position = 5)
        private String indexNumber;

        @CsvBindByPosition(position = 6)
        private String dietType;

        @CsvBindByPosition(position = 7)
        private String busNumber;
    }
}
