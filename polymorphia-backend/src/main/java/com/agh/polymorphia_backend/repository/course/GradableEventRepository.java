package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface GradableEventRepository extends JpaRepository<GradableEvent, Long> {
    @Query("""
                SELECT COUNT(cr) > 0
                FROM CriterionReward cr
                WHERE cr.criterion.gradableEvent = :gradableEvent
            """)
    boolean rewardExists(GradableEvent gradableEvent);

    @Query("""
                SELECT SUM(cg.xp)
                FROM CriterionGrade cg
                WHERE cg.criterion.gradableEvent = :gradableEvent
                AND cg.grade.animal.id = :animalId
            """)
    Optional<BigDecimal> sumGainedXp(GradableEvent gradableEvent, Long animalId);


    @Query("""
                SELECT COUNT(distinct scg.animal)
                FROM StudentCourseGroupAssignment scg
                join scg.courseGroup cg
                WHERE cg.instructor.user.id = :instructorId
                  AND NOT EXISTS (
                      SELECT 1
                      FROM Grade g
                      WHERE g.animal = scg.animal
                        AND g.gradableEvent.id = :gradableEventId
                  )
            """)
    long countUngradedAnimalsForInstructorAndEvent(Long instructorId, Long gradableEventId);
}
