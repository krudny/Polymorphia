package com.agh.polymorphia_backend.model.course;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "evolution_stages")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class EvolutionStage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private int minXp;

    @Column(precision = 2, scale = 1)
    private BigDecimal grade;

    private String imageUrl;

    private String imageWithoutBgUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
