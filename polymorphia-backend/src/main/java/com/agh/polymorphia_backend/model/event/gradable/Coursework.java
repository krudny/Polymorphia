package com.agh.polymorphia_backend.model.event.gradable;


import com.agh.polymorphia_backend.model.event.section.CourseworkSection;
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
@Table(name = "courseworks")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class Coursework extends GradableEvent<CourseworkSection> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coursework_section_id")
    @JsonBackReference
    @ToString.Exclude
    private CourseworkSection eventSection;

    @NotEmpty
    private String name;

    @NotEmpty
    private String topic;

    @NotEmpty
    private String infoUrl;

    @NotNull
    private Integer roadMapOrder;

    @NotNull
    private Boolean containsExtraAssignment = false;

    @NotNull
    private Boolean hidden = false;
}

