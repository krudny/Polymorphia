package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event.gradable.GradableEvent;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Entity
@Table(name = "event_sections")
@Inheritance(strategy = InheritanceType.JOINED)

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public abstract class EventSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotEmpty
    private String name;
    private boolean shownInRoadMap = false;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    public abstract Set<GradableEvent<?>> getGradableEvents();

}
