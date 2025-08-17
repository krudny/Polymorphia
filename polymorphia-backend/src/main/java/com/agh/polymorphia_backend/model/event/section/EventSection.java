package com.agh.polymorphia_backend.model.event.section;

import com.agh.polymorphia_backend.model.course.Course;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.SuperBuilder;

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

    @NotNull
    private boolean isShownInRoadMap = false;

    @NotNull
    private boolean eventsWithTopics = false;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @NotNull
    @Positive
    private Long orderIndex;

    @NotNull
    private Boolean isHidden = false;

    public abstract EventSectionType getEventSectionType();
}
