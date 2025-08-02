package com.agh.polymorphia_backend.model;

import com.agh.polymorphia_backend.model.event.section.EventSection;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Entity
@Table(name = "student_score_detail")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class StudentScoreDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    private HallOfFame hallOfFame;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_section_id", nullable = false)
    private EventSection eventSection;

    @ColumnDefault("0")
    private BigDecimal xp = BigDecimal.ZERO;
}
