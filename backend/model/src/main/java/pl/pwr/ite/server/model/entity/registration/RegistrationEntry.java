package pl.pwr.ite.server.model.entity.registration;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.pwr.ite.server.model.entity.EntityBase;

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

    public void setPart(RegistrationPart part) {
        this.part = part;
        this.partId = part == null ? null : part.getId();
    }
}
