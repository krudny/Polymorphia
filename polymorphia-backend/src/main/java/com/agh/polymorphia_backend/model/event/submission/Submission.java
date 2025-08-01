package com.agh.polymorphia_backend.model.event.submission;

import com.agh.polymorphia_backend.model.course.Animal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    @JoinColumn(name = "requirement_id")
    @JsonIgnore
    @ToString.Exclude
    private SubmissionRequirement requirement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    @JsonIgnore
    @ToString.Exclude
    private Animal animal;

    @NotEmpty
    private String url;

    @NotNull
    @Setter(AccessLevel.NONE)
    @CreationTimestamp
    private ZonedDateTime createdDate;

    @NotNull
    @Setter(AccessLevel.NONE)
    @UpdateTimestamp
    private ZonedDateTime modifiedDate;
}
