package com.agh.polymorphia_backend.model.event.submission;

import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Table(name = "submission_requirements")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SubmissionRequirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gradable_event_id")
    @JsonIgnore
    @ToString.Exclude
    private GradableEvent gradableEvent;

    @NotEmpty
    private String name;

    @NotNull
    private Boolean mandatory;

    @NotNull
    private Long orderIndex;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "requirement")
    @ToString.Exclude
    @JsonIgnore
    private Set<Submission> submissions;
}
