package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.repository.course.projections.CourseGroupProjection;
import com.agh.polymorphia_backend.repository.course.projections.CourseGroupShortProjection;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {
   String COURSE_GROUPS_QUERY_BASE = """
               from CourseGroup cg
            join cg.studentCourseGroupAssignments scga
            where (:studentId is null or scga.student.user.id = :studentId)
            and (:teachingRoleUserId is null or cg.teachingRoleUser.user.id = :teachingRoleUserId or cg.course.coordinator.user.id = :teachingRoleUserId)
            and cg.course.id = :courseId
        """;

    @Query("""
                select cg.name from CourseGroup cg
                    where cg.course.id = :courseId
            """)
    List<String> findNamesByCourseId(Long courseId);

    @Query("""
                select cg from CourseGroup cg
                    where (cg.teachingRoleUser.user.id = :teachingRoleUserId
                    or cg.course.coordinator.userId = :teachingRoleUserId)
                    and cg.id = :courseGroupId
            """)
    Optional<CourseGroup> findCourseGroupForTeachingRoleUser(Long courseGroupId, Long teachingRoleUserId);

    @Query("select cg.id as id, cg.name as name, cg.room as room, coalesce(count(scga.id), 0) as studentCount "
        + COURSE_GROUPS_QUERY_BASE + " group by cg.id, cg.name, cg.room")
    List<CourseGroupProjection> findCourseGroups(Long courseId, Long studentId, Long teachingRoleUserId);

    @Query("select distinct cg.id as id, cg.name as name" + COURSE_GROUPS_QUERY_BASE)
    List<CourseGroupShortProjection> findShortCourseGroups(Long courseId, Long studentId, Long teachingRoleUserId);

    Long course(@NotNull Course course);
}
