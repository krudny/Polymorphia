package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.dto.request.target_list.GradingTargetListRequestDto;
import com.agh.polymorphia_backend.dto.response.target_list.StudentTargetDataResponseDto;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import org.springframework.data.domain.Sort;
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
                SELECT COUNT(cr) > 0
                FROM CriterionReward cr
                WHERE cr.criterion.gradableEvent = :gradableEvent
            """)
    boolean rewardExists(GradableEvent gradableEvent);

    @Query("""
                SELECT SUM(cg.xp)
                FROM CriterionGrade cg
                WHERE cg.criterion.gradableEvent = :gradableEvent
                AND cg.grade.gradableEvent = :gradableEvent
                AND cg.grade.animal.id = :animalId
            """)
    Optional<BigDecimal> sumGainedXp(GradableEvent gradableEvent, Long animalId);


    @Query("""
                SELECT COUNT(distinct scg.animal)
                FROM StudentCourseGroupAssignment scg
                join scg.courseGroup cg
                WHERE cg.teachingRoleUser.user.id = :teachingRoleUserId
                  AND NOT EXISTS (
                      SELECT 1
                      FROM Grade g
                      WHERE g.animal = scg.animal
                        AND g.gradableEvent.id = :gradableEventId
                  )
            """)
    long countUngradedAnimalsForTeachingRoleUserAndEvent(Long teachingRoleUserId, Long gradableEventId);

    @Query("""
        select hofe.studentId      as studentId,
               hofe.studentName    as fullName,
               hofe.animalName     as animalName,
               hofe.evolutionStage as evolutionStage,
               hofe.groupName      as group,
               hofe.imageUrl       as imageUrl,
               sum(cg.xp)          as gainedXp
        from HallOfFameEntry hofe
                 left join Grade g on g.animal.id = hofe.animalId and g.gradableEvent.id = :gradableEventId
                 left join g.criteriaGrades cg
                 join StudentCourseGroupAssignment scga on scga.animal.id = hofe.animalId
        where (scga.courseGroup.teachingRoleUser.userId = :teachingRoleUserId or
               scga.courseGroup.course.coordinator.userId = :teachingRoleUserId)
          and (:includeAllGroups = true or hofe.groupName in :groups)
          and (:searchTerm = '' or ((:searchByAnimal = true and
                                     lower(hofe.animalName) like lower(concat('%', :searchTerm, '%'))) or
                                    (:searchByStudent = true and
                                     lower(hofe.studentName) like lower(concat('%', :searchTerm, '%')))))
          and (:gradeStatus = 'ALL' or (:gradeStatus = 'GRADED' and g.id is not null) or
               (:gradeStatus = 'UNGRADED' and g.id is null))
          and hofe.courseId = :courseId
        group by hofe.studentId, hofe.studentName, hofe.animalName, hofe.evolutionStage, hofe.groupName,
                 hofe.imageUrl
        order by case
                     when :sortBy = 'gainedXp' and :sortOrder = 'ASC' then COALESCE(sum(cg.xp), -1) end asc,
                 case
                     when :sortBy = 'gainedXp' and :sortOrder = 'DESC'
                         then COALESCE(sum(cg.xp), -1) end desc,
                 case when :sortBy = 'studentName' and :sortOrder = 'ASC' then hofe.studentName end asc,
                 case when :sortBy = 'studentName' and :sortOrder = 'DESC' then hofe.studentName end desc,
                 case when :sortBy = 'animalName' and :sortOrder = 'ASC' then hofe.animalName end asc,
                 case when :sortBy = 'animalName' and :sortOrder = 'DESC' then hofe.animalName end desc
        """)
    List<StudentTargetDataResponseDto> getStudentTargets(
            @Param("courseId") Long courseId,
            @Param("gradableEventId") Long gradableEventId,
            @Param("teachingRoleUserId") Long teachingRoleUserId,
            @Param("groups") List<String> groups,
            @Param("includeAllGroups") Boolean includeAllGroups,
            @Param("searchTerm") String searchTerm,
            @Param("searchByAnimal") Boolean searchByAnimal,
            @Param("searchByStudent") Boolean searchByStudent,
            @Param("sortBy") String sortBy,
            @Param("sortOrder") String sortOrder,
            @Param("gradeStatus") String gradeStatus

    );
}
