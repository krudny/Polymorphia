package com.agh.polymorphia_backend.model.event.submission;


import com.agh.polymorphia_backend.model.project.ProjectGroup;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_submissions")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class ProjectSubmission extends Submission {
    @NotEmpty
    private String projectUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_group_id")
    private ProjectGroup projectGroup;
}
