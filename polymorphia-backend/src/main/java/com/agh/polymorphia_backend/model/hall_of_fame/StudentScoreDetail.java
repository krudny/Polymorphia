package com.agh.polymorphia_backend.model.hall_of_fame;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Getter
@Immutable
@Table(name = "student_score_detail_view")
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
