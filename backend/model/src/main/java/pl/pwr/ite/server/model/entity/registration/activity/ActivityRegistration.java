package pl.pwr.ite.server.model.entity.registration.activity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import pl.pwr.ite.server.model.entity.Activity;
import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.entity.registration.RegistrationEntry;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class ActivityRegistration extends EntityBase {

    @OneToOne
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @Column(insertable = false, updatable = false, name = "activity_id")
    private UUID activityId;

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false)
    private Integer teamSizeLimit;

    @Column(nullable = false)
    @ColumnDefault("true")
    private Boolean requireFullTeam;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean active;

    @Column
    private String termsAndRulesUrl;

    @Column
    private LocalDateTime startTime;

    @OneToMany(mappedBy = "activityRegistration")
    private Set<ActivityEntry> entries = new HashSet<>();

    public void setActivity(Activity activity) {
        this.activity = activity;
        this.activityId = activity == null ? null : activity.getId();
    }
}
