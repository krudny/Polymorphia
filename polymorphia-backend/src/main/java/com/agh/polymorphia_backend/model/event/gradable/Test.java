package com.agh.polymorphia_backend.model.event.gradable;


import com.agh.polymorphia_backend.model.event.section.TestSection;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "project_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class Test extends GradableEvent {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_section_id")
    private TestSection testSection;

    @NotEmpty
    private String name;

    @NotNull
    private Integer roadMapOrder;

    @NotNull
    private Boolean hidden = false;

}
