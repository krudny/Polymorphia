package com.agh.polymorphia_backend.model.course;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "evolution_stages")
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
public class EvolutionStage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    @Column(length = 1000)
    private String description;

    @NotNull
    private Integer minXp;

    @NotNull
    @Column(precision = 2, scale = 1)
    private BigDecimal grade;

    @NotEmpty
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
