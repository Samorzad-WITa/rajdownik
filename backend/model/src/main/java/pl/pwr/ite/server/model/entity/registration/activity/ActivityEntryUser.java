package pl.pwr.ite.server.model.entity.registration.activity;

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
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class ActivityEntryUser extends EntityBase {

    @ManyToOne
    @JoinColumn(nullable = false, name = "activity_entry_id")
    private ActivityEntry activityEntry;

    @Column(insertable = false, updatable = false, nullable = false, name = "activity_entry_id")
    private UUID activityEntryId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(insertable = false, updatable = false, nullable = false, name = "user_id")
    private UUID userId;

    public void setActivityEntry(ActivityEntry activityEntry) {
        this.activityEntry = activityEntry;
        this.activityEntryId = activityEntry == null ? null : activityEntry.getId();
    }

    public void setUser(User user) {
        this.user = user;
        this.userId = user == null ? null : user.getId();
    }
}
