package com.agh.polymorphia_backend.model.grade;

import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_grades")
@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class ProjectGrade extends Grade {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_submission_id")
    @JsonIgnore
    @ToString.Exclude
    private ProjectSubmission projectSubmission;
}
