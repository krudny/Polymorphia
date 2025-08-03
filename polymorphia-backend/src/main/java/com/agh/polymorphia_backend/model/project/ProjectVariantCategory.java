package com.agh.polymorphia_backend.model.project;

import com.agh.polymorphia_backend.model.event.section.ProjectSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@NoArgsConstructor
@SuperBuilder
@Table(name = "project_variant_catogories")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProjectVariantCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_section_id")
    @ToString.Exclude
    private ProjectSection projectSection;

    @NotEmpty
    private String name;
}
