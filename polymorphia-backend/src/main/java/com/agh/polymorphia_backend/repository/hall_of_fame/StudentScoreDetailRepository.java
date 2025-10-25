package com.agh.polymorphia_backend.repository.hall_of_fame;

import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentScoreDetailRepository extends JpaRepository<StudentScoreDetail, Long> {
    List<StudentScoreDetail> findByAnimalIdIn(List<Long> animalIds);

    List<StudentScoreDetail> findByAnimalId(Long animalId);

    Optional<StudentScoreDetail> findByAnimalIdAndEventSectionId(Long animalId, Long eventSectionId);
}
