package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Table(name = "coursework_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class CourseworkSection extends EventSection {
    @OneToMany(mappedBy = "eventSection", fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private Set<Coursework> courseworks;
}
