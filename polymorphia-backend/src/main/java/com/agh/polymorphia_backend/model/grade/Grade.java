package com.agh.polymorphia_backend.model.grade;


import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(
        name = "grades",
        uniqueConstraints = @UniqueConstraint(columnNames = {"animal_id", "gradable_event_id"})
)
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    @Setter(AccessLevel.NONE)
    private ZonedDateTime createdDate;

    @NotNull
    private ZonedDateTime modifiedDate;

    @NotNull
    private Integer xp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    @JsonBackReference
    private GradableEvent<?> gradableEvent;

    @OneToMany(mappedBy = "grade", fetch = FetchType.LAZY)
    private Set<AssignedChest> assignedChests;

    @PrePersist
    protected void onCreate() {
        if (createdDate == null) {
            createdDate = ZonedDateTime.now();
        }
        modifiedDate = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        modifiedDate = ZonedDateTime.now();
    }

}
