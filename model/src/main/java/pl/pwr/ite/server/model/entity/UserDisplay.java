package pl.pwr.ite.server.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class UserDisplay extends EntityBase {

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(insertable = false, updatable = false, name = "user_id")
    private UUID userId;

    @Column(length = 50)
    private String label;

    @Column
    private LocalDateTime timeFrom;

    @Column
    private LocalDateTime timeTo;

    public void setUser(User user) {
        this.user = user;
        this.userId = user == null ? null : user.getId();
    }
}
