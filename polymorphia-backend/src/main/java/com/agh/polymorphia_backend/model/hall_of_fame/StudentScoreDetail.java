package com.agh.polymorphia_backend.model.hall_of_fame;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Getter
@Immutable
@Table(name = "student_score_detail_view")
public class StudentScoreDetail {
    @Id
    private String id;
    private Long animalId;
    private Long eventSectionId;
    private String eventSectionName;
    private BigDecimal rawXp;
    private BigDecimal flatBonus;
    private BigDecimal percentageBonus;
}
