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
public class Activity extends EntityBase {

    @ManyToOne
    @JoinColumn
    private Event event;

    @Column(insertable = false, updatable = false, name = "event_id")
    private UUID eventId;

    @Column(nullable = false)
    private LocalDateTime timeFrom;

    @Column(nullable = false)
    private LocalDateTime timeTo;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "character varying")
    private String description;

    @Column(length = 100)
    private String location;

    public void setEvent(Event event) {
        this.event = event;
        this.eventId = event == null ? null : event.getId();
    }
}
