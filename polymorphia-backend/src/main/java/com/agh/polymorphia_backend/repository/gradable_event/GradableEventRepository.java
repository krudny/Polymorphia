package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import com.agh.polymorphia_backend.repository.gradable_event.projections.InstructorGradableEventProjection;
import com.agh.polymorphia_backend.repository.gradable_event.projections.StudentGradableEventProjection;


@Repository
public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {

    @Query("SELECT ge.eventSection.course.id FROM GradableEvent ge WHERE ge.id = :id")
    Optional<Long> getCourseIdByGradableEventId(@Param("id") Long id);

    @Query("""
    SELECT ge.id as id,
           ge.name as name,
           ge.orderIndex as orderIndex,
           ge.topic as topic,
           ge.roadMapOrderIndex as roadMapOrderIndex,
           ge.isHidden as isHidden,
           ge.isLocked as isLocked,
           CASE
               WHEN COUNT(DISTINCT g.id) > 0 
               THEN TO_CHAR(SUM(DISTINCT cg.xp), 'FM9999990.0')
               ELSE NULL
           END as gainedXp,
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
    WHERE (:scope = 'COURSE' AND ge.eventSection.course.id = :idValue)
       OR (:scope = 'EVENT_SECTION' AND ge.eventSection.id = :idValue)
      AND ge.isHidden = false
    GROUP BY ge.id, ge.name, ge.orderIndex, ge.roadMapOrderIndex, ge.isHidden, ge.isLocked, ge.topic, ge.eventSection.id
    ORDER BY 
        CASE WHEN :sortBy = 'ORDER_INDEX' THEN ge.orderIndex END,
        CASE WHEN :sortBy = 'ROADMAP_ORDER_INDEX' THEN ge.roadMapOrderIndex END
    """)
    List<StudentGradableEventProjection> findStudentGradableEventsWithDetails(
            @Param("idValue") Long idValue,
            @Param("animalId") Long animalId,
            @Param("scope") String scope,
            @Param("sortBy") String sortBy
    );



    @Query("""
    SELECT ge.id as id,
           ge.name as name,
           ge.topic as topic,
           ge.orderIndex as orderIndex,
           ge.roadMapOrderIndex as roadMapOrderIndex,
           ge.isHidden as isHidden,
           ge.isLocked as isLocked,
           COUNT(DISTINCT CASE 
               WHEN g.id IS NULL THEN scga.animal.id
           END) as ungradedStudents,
           CASE WHEN COUNT(DISTINCT cr.criterion.id) > 0 THEN true ELSE false END as hasPossibleReward
    FROM GradableEvent ge
    LEFT JOIN Criterion c ON c.gradableEvent.id = ge.id
    LEFT JOIN CriterionReward cr ON cr.criterion.id = c.id
    CROSS JOIN StudentCourseGroupAssignment scga
    JOIN scga.courseGroup cg
    LEFT JOIN Grade g ON g.gradableEvent.id = ge.id 
        AND g.animal.id = scga.animal.id
    WHERE (:scope = 'COURSE' AND ge.eventSection.course.id = :idValue)
       OR (:scope = 'EVENT_SECTION' AND ge.eventSection.id = :idValue)
      AND cg.instructor.user.id = :instructorId
      AND ge.isHidden = false
    GROUP BY ge.id, ge.name, ge.topic, ge.orderIndex, ge.roadMapOrderIndex, ge.isHidden, ge.isLocked, ge.eventSection.id
    ORDER BY 
        CASE WHEN :sortBy = 'ORDER_INDEX' THEN ge.orderIndex END,
        CASE WHEN :sortBy = 'ROADMAP_ORDER_INDEX' THEN ge.roadMapOrderIndex END
    """)
    List<InstructorGradableEventProjection> findInstructorGradableEventsWithDetails(
            @Param("idValue") Long idValue,
            @Param("instructorId") Long instructorId,
            @Param("scope") String scope,
            @Param("sortBy") String sortBy
    );

    @Query("""
    SELECT ge.id as id,
           ge.name as name,
           ge.topic as topic,
           ge.orderIndex as orderIndex,
           ge.roadMapOrderIndex as roadMapOrderIndex,
           ge.isHidden as isHidden,
           ge.isLocked as isLocked,
           COUNT(DISTINCT CASE 
               WHEN g.id IS NULL THEN scga.animal.id
           END) as ungradedStudents,
           CASE WHEN COUNT(DISTINCT cr.criterion.id) > 0 THEN true ELSE false END as hasPossibleReward
    FROM GradableEvent ge
    LEFT JOIN Criterion c ON c.gradableEvent.id = ge.id
    LEFT JOIN CriterionReward cr ON cr.criterion.id = c.id
    CROSS JOIN StudentCourseGroupAssignment scga
    LEFT JOIN Grade g ON g.gradableEvent.id = ge.id 
        AND g.animal.id = scga.animal.id
    WHERE (:scope = 'COURSE' AND ge.eventSection.course.id = :idValue)
       OR (:scope = 'EVENT_SECTION' AND ge.eventSection.id = :idValue)
      AND ge.isHidden = false
    GROUP BY ge.id, ge.name, ge.topic, ge.orderIndex, ge.roadMapOrderIndex, ge.isHidden, ge.isLocked, ge.eventSection.id
    ORDER BY 
        CASE WHEN :sortBy = 'ORDER_INDEX' THEN ge.orderIndex END,
        CASE WHEN :sortBy = 'ROADMAP_ORDER_INDEX' THEN ge.roadMapOrderIndex END
    """)
    List<InstructorGradableEventProjection> getCoordinatorGradableEventsWithDetails(
            @Param("idValue") Long idValue,
            @Param("scope") String scope,
            @Param("sortBy") String sortBy
    );
}
