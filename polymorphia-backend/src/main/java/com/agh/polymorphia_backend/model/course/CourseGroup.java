package com.agh.polymorphia_backend.model.course;

import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.TeachingRoleUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "course_groups")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CourseGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotEmpty
    private String name;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @ToString.Exclude
    @JsonIgnore
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teaching_role_user_id")
    @ToString.Exclude
    @JsonIgnore
    private TeachingRoleUser teachingRoleUser;

    @NotNull
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "courseGroup")
    @ToString.Exclude
    @JsonIgnore
    private List<StudentCourseGroupAssignment> studentCourseGroupAssignments;
}
