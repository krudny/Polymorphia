package com.agh.polymorphia_backend.model.grade;

import com.agh.polymorphia_backend.model.event.submission.AssignmentSubmission;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "assignment_grades")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class AssignmentGrade extends Grade {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_submission_id")
    private AssignmentSubmission assignmentSubmission;
}
