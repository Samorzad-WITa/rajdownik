package pl.pwr.ite.server.model.entity.registration.activity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.pwr.ite.server.model.entity.EntityBase;
import pl.pwr.ite.server.model.entity.User;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class ActivityEntry extends EntityBase {

    @ManyToOne
    @JoinColumn(nullable = false, name = "activity_registration_id")
    private ActivityRegistration activityRegistration;

    @Column(insertable = false, updatable = false, nullable = false, name = "activity_registration_id")
    private UUID activityRegistrationId;

    @Column(nullable = false, length = 50)
    private String teamName;

    @ManyToOne
    @JoinColumn(nullable = false, name = "team_captain_id")
    private User teamCaptain;

    @Column(insertable = false, updatable = false, nullable = false, name = "name_captain_id")
    private UUID teamCaptainId;

    @OneToMany(mappedBy = "activityEntry")
    private Set<ActivityEntryUser> users = new HashSet<>();

    public void setActivityRegistration(ActivityRegistration activityRegistration) {
        this.activityRegistration = activityRegistration;
        this.activityRegistrationId = activityRegistration == null ? null : activityRegistration.getId();
    }

    public void setTeamCaptain(User teamCaptain) {
        this.teamCaptain = teamCaptain;
        this.teamCaptainId = teamCaptain == null ? null : teamCaptain.getId();
    }
}
