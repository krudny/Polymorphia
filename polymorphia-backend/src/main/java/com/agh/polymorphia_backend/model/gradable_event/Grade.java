package com.agh.polymorphia_backend.model.gradable_event;

import com.agh.polymorphia_backend.model.course.Animal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "grades")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "gradable_event_id")
    @ToString.Exclude
    @JsonIgnore
    private GradableEvent gradableEvent;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "animal_id")
    @ToString.Exclude
    @JsonIgnore
    private Animal animal;

    @NotNull
    private ZonedDateTime createdDate;

    @NotNull
    private ZonedDateTime modifiedDate;

    @NotNull
    private String comment;

    @PrePersist
    void onCreate() {
        if (createdDate == null) createdDate = ZonedDateTime.now();
        if (modifiedDate == null) modifiedDate = createdDate;
    }

    @PreUpdate
    void onUpdate() {
        modifiedDate = ZonedDateTime.now();
    }
}
