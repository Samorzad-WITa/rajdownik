package pl.pwr.ite.server.model.entity.registration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import pl.pwr.ite.server.model.entity.EntityBase;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true, callSuper = true)
public class Registration extends EntityBase {

    @Column(nullable = false, length = 100)
    private String title;

    @Column
    private LocalDateTime startTime;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean active;

    @OneToMany(mappedBy = "registration")
    private Set<RegistrationPart> parts = new HashSet<>();
}
