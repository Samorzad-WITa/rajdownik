package pl.pwr.ite.server.model.entity.registration;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.entity.User;

import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true, callSuper = true)
public class RegistrationEntry extends EntityBase {

    @ManyToOne
    @JoinColumn(nullable = false, name = "part_id")
    private RegistrationPart part;

    @Column(insertable = false, updatable = false, nullable = false, name = "part_id")
    private UUID partId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(insertable = false, updatable = false, nullable = false, name = "user_id")
    private UUID userId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "registered_by_id")
    private User registeredBy;

    @Column(insertable = false, updatable = false, nullable = false, name = "registered_by_id")
    private UUID registeredById;

    public void setUser(User user) {
        this.user = user;
        this.userId = user == null ? null : user.getId();
    }

    public void setRegisteredBy(User registeredBy) {
        this.registeredBy = registeredBy;
        this.registeredById = registeredBy == null ? null : registeredBy.getId();
    }

    public void setPart(RegistrationPart part) {
        this.part = part;
        this.partId = part == null ? null : part.getId();
    }
}
