package pl.pwr.ite.server.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.pwr.ite.server.model.enums.UserType;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "`user`")
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class User extends EntityBase {

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private UserType type;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false, length = 15)
    private String phoneNumber;

    @Column(nullable = false, length = 6)
    private String indexNumber;

    @Column(length = 50)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Column(length = 64)
    private String passwordHash;

    @OneToMany(mappedBy = "user")
    private Set<UserRole> roles = new HashSet<>();
}