package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.gradable_event.projections.InstructorGradableEventProjection;
import com.agh.polymorphia_backend.repository.gradable_event.projections.StudentGradableEventProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {
    @Query("SELECT ge.eventSection.course.id FROM GradableEvent ge WHERE ge.id = :id")
    Optional<Long> getCourseIdByGradableEventId(@Param("id") Long id);

    @Query("""
        SELECT ge.id as id,
               ge.name as name,
               ge.orderIndex as orderIndex,
               ge.roadMapOrderIndex as roadMapOrderIndex,
               ge.isHidden as isHidden,
               COALESCE(SUM(DISTINCT cg.xp), 0) as gainedXp,
               CASE WHEN COUNT(DISTINCT cr.criterion.id) > 0 THEN true ELSE false END as hasPossibleReward,
               CASE WHEN COUNT(DISTINCT g.id) > 0 THEN true ELSE false END as isGraded,
               CASE WHEN COUNT(DISTINCT g.id) > 0 AND COUNT(DISTINCT ar.id) > 0 
                    THEN true 
                    ELSE false 
               END as isRewardAssigned
        FROM GradableEvent ge
        LEFT JOIN Grade g ON g.gradableEvent.id = ge.id AND g.animal.id = :animalId
        LEFT JOIN Criterion c ON c.gradableEvent.id = ge.id
        LEFT JOIN CriterionGrade cg ON cg.grade.id = g.id AND cg.criterion.id = c.id
        LEFT JOIN CriterionReward cr ON cr.criterion.id = c.id
        LEFT JOIN AssignedReward ar ON ar.criterionGrade.id = cg.id
        WHERE ge.eventSection.id = :eventSectionId
          AND ge.isHidden = false
        GROUP BY ge.id, ge.name, ge.orderIndex, ge.roadMapOrderIndex, ge.isHidden
        ORDER BY 
            CASE WHEN :sortBy = 'ORDER_INDEX' THEN ge.orderIndex END,
            CASE WHEN :sortBy = 'ROADMAP_ORDER_INDEX' THEN ge.roadMapOrderIndex END
    """)
    List<StudentGradableEventProjection> findStudentGradableEventsWithDetails(
            @Param("eventSectionId") Long eventSectionId,
            @Param("animalId") Long animalId,
            @Param("sortBy") String sortBy
    );

    @Query("""
    SELECT ge.id as id,
           ge.name as name,
           ge.orderIndex as orderIndex,
           ge.roadMapOrderIndex as roadMapOrderIndex,
           ge.isHidden as isHidden,
           ge.isLocked as isLocked,
           COUNT(DISTINCT CASE 
               WHEN NOT EXISTS (
                   SELECT 1 
                   FROM Grade g2
                   WHERE g2.gradableEvent.id = ge.id 
                     AND g2.animal IN (
                         SELECT scga.animal
                         FROM StudentCourseGroupAssignment scga
                         JOIN scga.courseGroup cg
                         WHERE cg.instructor.user.id = :instructorId
                     )
               )
               THEN scga.animal.id
           END) as ungradedStudents,
           CASE WHEN COUNT(DISTINCT cr.criterion.id) > 0 THEN true ELSE false END as hasPossibleReward
    FROM GradableEvent ge
    LEFT JOIN Criterion c ON c.gradableEvent.id = ge.id
    LEFT JOIN CriterionReward cr ON cr.criterion.id = c.id
    CROSS JOIN StudentCourseGroupAssignment scga
    CROSS JOIN CourseGroup cg
    WHERE ge.eventSection.id = :eventSectionId
      AND cg.instructor.user.id = :instructorId
      AND scga.courseGroup.id = cg.id
      AND ge.isHidden = false
    GROUP BY ge.id, ge.name, ge.orderIndex, ge.roadMapOrderIndex, ge.isHidden, ge.isLocked
    ORDER BY 
        CASE WHEN :sortBy = 'ORDER_INDEX' THEN ge.orderIndex END,
        CASE WHEN :sortBy = 'ROADMAP_ORDER_INDEX' THEN ge.roadMapOrderIndex END
""")
    List<InstructorGradableEventProjection> findInstructorGradableEventsWithDetails(
            @Param("eventSectionId") Long eventSectionId,
            @Param("instructorId") Long instructorId,
            @Param("sortBy") String sortBy
    );

}
