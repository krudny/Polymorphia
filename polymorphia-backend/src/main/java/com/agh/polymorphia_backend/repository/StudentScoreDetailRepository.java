package com.agh.polymorphia_backend.repository;

import com.agh.polymorphia_backend.model.StudentScoreDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentScoreDetailRepository extends JpaRepository<StudentScoreDetail, Long> {
    List<StudentScoreDetail> findByAnimalIdIn(List<Long> animalIds);
}
