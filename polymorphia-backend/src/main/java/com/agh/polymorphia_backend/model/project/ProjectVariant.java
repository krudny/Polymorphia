package com.agh.polymorphia_backend.model.project;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@SuperBuilder
@Table(name = "project_variants")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProjectVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String shortCode;

    @NotEmpty
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_variant_category_id")
    @JsonBackReference
    @ToString.Exclude
    private ProjectVariantCategory projectVariantCategory;
}
