package com.agh.polymorphia_backend.repository.criterion;

import com.agh.polymorphia_backend.model.criterion.Criterion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriterionRepository extends JpaRepository<Criterion, Long> {

}
