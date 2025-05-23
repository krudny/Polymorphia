package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.model.event.gradable.Test;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Table(name = "test_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class TestSection extends EventSection {
    @OneToMany(mappedBy = "eventSection", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private Set<Test> tests;
}
