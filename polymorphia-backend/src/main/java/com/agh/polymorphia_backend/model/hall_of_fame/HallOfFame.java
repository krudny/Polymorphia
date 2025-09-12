package com.agh.polymorphia_backend.model.hall_of_fame;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Table(name = "hall_of_fame_view")
@Immutable
@Getter
public class HallOfFame {
    public static final String FIELD_ANIMAL_NAME = "animalName";
    public static final String FIELD_STUDENT_NAME = "studentName";
    public static final String FIELD_TOTAL_XP_SUM = "totalXpSum";
    public static final String FIELD_TOTAL_BONUS_SUM = "totalBonusSum";
    public static final String FIELD_POSITION = "position";

    @Id
    private Long animalId;
    private String animalName;
    private Long studentId;
    private String studentName;
    private String groupName;
    private Long courseId;
    private Integer position;
    private String evolutionStage;
    private String imageUrl;
    private BigDecimal totalBonusSum;
    private BigDecimal totalXpSum;
}
