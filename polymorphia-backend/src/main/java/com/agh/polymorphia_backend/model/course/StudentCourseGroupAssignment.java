package com.agh.polymorphia_backend.model.course;

import com.agh.polymorphia_backend.model.user.Student;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name="students_course_groups")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class StudentCourseGroupAssignment {
    @EmbeddedId
    @EqualsAndHashCode.Include
    private StudentCourseGroupAssignmentId id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("studentId")
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("courseGroupId")
    @JoinColumn(name = "course_group_id", nullable = false)
    private CourseGroup courseGroup;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;
}
