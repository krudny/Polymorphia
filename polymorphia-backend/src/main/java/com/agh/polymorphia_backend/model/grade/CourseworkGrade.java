package com.agh.polymorphia_backend.model.grade;

import com.agh.polymorphia_backend.model.event.submission.CourseworkSubmission;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "coursework_grades")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class CourseworkGrade extends Grade {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coursework_submission_id")
    private CourseworkSubmission courseworkSubmission;
}
