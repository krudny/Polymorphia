package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    List<Grade> findAllByAnimalId(Long animalId);

    @Query(
            """
                    select g
                    from Grade g
                    where g.animal.id = :animalId
                    AND g.gradableEvent.id = :gradableEventId
                    """
    )
    Optional<Grade> findAllByAnimalIdAndGradableEventId(Long animalId, Long gradableEventId);

    @Query(value = """
select
    g.animal_id as animalName,
    ge.id as id,
    ge.name as gradableEventName,
    cg.xp as gainedXp,
    case when count(ar.id) > 0 then true else false end as hasReward,
    g.modified_date as gradeDate
from grades g
         join gradable_events ge on g.gradable_event_id = ge.id
         join criteria_grades cg on g.id = cg.grade_id
         left join assigned_rewards ar on cg.id = ar.criterion_grade_id
where animal_id = :animalId
group by ge.id, ge.name , g.modified_date, g.animal_id, cg.xp
order by g.modified_date desc
    """, nativeQuery = true)
    List<StudentActivityProjection> findStudentActivity(Long animalId);
}
