package pl.pwr.ite.server.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Announcement extends EntityBase {

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "character varying")
    private String description;
}
