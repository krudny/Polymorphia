package com.agh.polymorphia_backend.model.user;

import com.agh.polymorphia_backend.model.course.Course;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@Entity
@Table(
        name = "user_course_roles"
)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserCourseRole {
    @EmbeddedId
    private UserCourseRoleId id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserType role;


    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("courseId")
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
}
