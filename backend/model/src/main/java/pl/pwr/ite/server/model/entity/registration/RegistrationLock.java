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
public class RegistrationLock extends EntityBase {

    @OneToOne
    @JoinColumn(nullable = false, name = "part_id")
    private RegistrationPart part;

    @Column(updatable = false, insertable = false, nullable = false, name = "part_id")
    private UUID partId;

    @OneToOne
    @JoinColumn(nullable = false, name = "owner_id")
    private User owner;

    @Column(insertable = false, updatable = false, nullable = false, name = "owner_id")
    private UUID ownerId;

    public void setPart(RegistrationPart part) {
        this.part = part;
        this.partId = part == null ? null : part.getId();
    }

    public void setOwner(User owner) {
        this.owner = owner;
        this.ownerId = owner == null ? null : owner.getId();
    }
}
