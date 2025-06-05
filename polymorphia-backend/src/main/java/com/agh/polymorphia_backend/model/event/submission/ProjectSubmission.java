package com.agh.polymorphia_backend.model.event.submission;


import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_submissions")

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class ProjectSubmission extends Submission {
    @NotEmpty
    private String projectUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_group_id")
    @ToString.Exclude
    @JsonIgnore
    private ProjectGroup projectGroup;
}
