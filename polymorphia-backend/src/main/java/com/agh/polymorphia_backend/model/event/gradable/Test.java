package com.agh.polymorphia_backend.model.event.gradable;


import com.agh.polymorphia_backend.model.event.section.TestSection;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "tests")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@SuperBuilder
@NoArgsConstructor
public class Test extends GradableEvent<TestSection> {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_section_id")
    @JsonBackReference
    @ToString.Exclude
    private TestSection testSection;

    @NotEmpty
    private String name;

    private String topic;

    @NotNull
    private Integer roadMapOrder;

    @NotNull
    private Boolean hidden = false;

    @Override
    public TestSection getEventSection() {
        return testSection;
    }
}
