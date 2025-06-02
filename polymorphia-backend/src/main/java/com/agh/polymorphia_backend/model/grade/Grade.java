package com.agh.polymorphia_backend.model.grade;


import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.agh.polymorphia_backend.model.grade.reward.AssignedChest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
public abstract class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @Setter(AccessLevel.NONE)
    @CreationTimestamp
    private ZonedDateTime createdDate;

    @Setter(AccessLevel.NONE)
    @UpdateTimestamp
    private ZonedDateTime modifiedDate;

    @NotNull
    private Float xp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    private GradableEvent<?> gradableEvent;

    @OneToMany(mappedBy = "grade", fetch = FetchType.LAZY)
    private Set<AssignedChest> assignedChests;
}
