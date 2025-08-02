package com.agh.polymorphia_backend.model;

import com.agh.polymorphia_backend.model.course.Animal;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Entity
@Table(name = "hall_of_fame")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class HallOfFame {
    @Id
    @Column(name = "animal_id")
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "animal_id")
    private Animal animal;

    // TODO: czy defaulty != 0?
    @ColumnDefault("0")
    private BigDecimal totalXp = BigDecimal.ZERO;

    @ColumnDefault("0")
    private BigDecimal flatBonusXp = BigDecimal.ZERO;

    @ColumnDefault("0")
    private BigDecimal percentageBonusXp = BigDecimal.ZERO;
}
