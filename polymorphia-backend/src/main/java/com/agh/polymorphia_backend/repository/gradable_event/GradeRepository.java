package com.agh.polymorphia_backend.repository.gradable_event;

import com.agh.polymorphia_backend.model.grade.Grade;
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

}
