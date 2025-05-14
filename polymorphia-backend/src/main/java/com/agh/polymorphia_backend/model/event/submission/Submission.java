package com.agh.polymorphia_backend.model.event.submission;

import com.agh.polymorphia_backend.model.course.Animal;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;

@Entity
@Table(name = "submissions")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @NotNull
    @Setter(AccessLevel.NONE)
    private ZonedDateTime createdDate;

    @NotNull
    private ZonedDateTime modifiedDate;

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
