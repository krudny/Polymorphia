package com.agh.polymorphia_backend.model.grade;

import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_grades")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class ProjectGrade extends Grade {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_submission_id")
    private ProjectSubmission projectSubmission;
}
