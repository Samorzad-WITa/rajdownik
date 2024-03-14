package pl.pwr.ite.server.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Event extends EntityBase {

    @Column
    private LocalDateTime timeFrom;

    @Column
    private LocalDateTime timeTo;

    @Column(nullable = false, length = 100)
    private String title;
}
