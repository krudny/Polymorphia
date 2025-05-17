package com.agh.polymorphia_backend.model.event.submission;

import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(
        name = "coursework_submissions",
        uniqueConstraints = @UniqueConstraint(columnNames = {"coursework_id", "animal_id"})
)
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class CourseworkSubmission extends Submission {
    @NotEmpty
    private String prUrl;

    @NotEmpty
    private String extraAssignmentPrUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coursework_id")
    private Coursework coursework;
}
