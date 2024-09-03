package pl.pwr.ite.server.model.entity.registration;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.pwr.ite.server.model.entity.EntityBase;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true, callSuper = true)
public class RegistrationPart extends EntityBase {

    @ManyToOne
    @JoinColumn(nullable = false, name = "registration_id")
    private Registration registration;

    @Column(insertable = false, updatable = false, nullable = false, name = "registration_id")
    private UUID registrationId;

    @Column(nullable = false, length = 100)
    private String title;

    @OneToOne(mappedBy = "part")
    private RegistrationLock lock;

    @Column(nullable = false)
    private Integer entryLimit;

    @OneToMany(mappedBy = "part")
    private Set<RegistrationEntry> entries = new HashSet<>();

    public void setRegistration(Registration registration) {
        this.registration = registration;
        this.registrationId = registration == null ? null : registration.getId();
    }
}
