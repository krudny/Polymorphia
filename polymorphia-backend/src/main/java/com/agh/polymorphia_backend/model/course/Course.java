package com.agh.polymorphia_backend.model.course;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Table(name = "courses")
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String infoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinator_id")
    private Coordinator coordinator;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "course")
    @ToString.Exclude
    @JsonIgnore
    private List<CourseGroup> courseGroups;
}
