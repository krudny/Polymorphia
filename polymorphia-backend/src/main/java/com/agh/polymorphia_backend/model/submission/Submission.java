package com.agh.polymorphia_backend.model.submission;

import com.agh.polymorphia_backend.model.user.student.Animal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "submissions")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "submission_requirement_id")
    @ToString.Exclude
    @JsonIgnore
    private SubmissionRequirement submissionRequirement;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "animal_id")
    @ToString.Exclude
    @JsonIgnore
    private Animal animal;

    @NotNull
    private String url;

    @NotNull
    private boolean isLocked = false;

    @NotNull
    private ZonedDateTime createdDate;

    @NotNull
    private ZonedDateTime modifiedDate;

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
