package com.agh.polymorphia_backend.model.event.gradable;


import com.agh.polymorphia_backend.model.event.section.AssignmentSection;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "assignments")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class Assignment extends GradableEvent<AssignmentSection> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_section_id")
    @JsonBackReference
    @ToString.Exclude
    private AssignmentSection assignmentSection;

    @NotEmpty
    private String name;

    private String topic;

    @NotEmpty
    private String infoUrl;

    @NotNull
    private Integer roadMapOrder;

    @NotNull
    private Boolean containsExtraAssignment = false;

    @NotNull
    private Boolean hidden = false;

    @Override
    public AssignmentSection getEventSection() {
        return assignmentSection;
    }
}

