package pl.pwr.ite.server.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class UserData extends EntityBase {

    @ManyToOne
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(insertable = false, updatable = false, name = "user_id")
    private UUID userId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "data_id")
    private Data data;

    @Column(insertable = false, updatable = false, name = "data_id")
    private UUID dataId;

    @Column(nullable = false, length = 50)
    private String value;
}
