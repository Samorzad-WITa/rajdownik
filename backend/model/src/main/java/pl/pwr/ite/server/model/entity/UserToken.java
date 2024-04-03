package pl.pwr.ite.server.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import pl.pwr.ite.server.model.enums.UserTokenType;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class UserToken extends EntityBase {

    @Column(nullable = false, length = 32)
    @Enumerated(EnumType.STRING)
    private UserTokenType type;

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(updatable = false, insertable = false, name = "user_id")
    private UUID userId;

    @Column(nullable = false, length = 64)
    private String token;

    @Column
    private LocalDateTime expiryTime;

    public void setUser(User user) {
        this.user = user;
        this.userId = user == null ? null : user.getId();
    }
}
