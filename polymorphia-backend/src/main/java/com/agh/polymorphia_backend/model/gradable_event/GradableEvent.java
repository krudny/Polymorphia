package com.agh.polymorphia_backend.model.gradable_event;

import com.agh.polymorphia_backend.model.event_section.EventSection;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "gradable_events")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class GradableEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_section_id")
    @ToString.Exclude
    @JsonIgnore
    private EventSection eventSection;

    @NotNull
    @Column(length = 64)
    private String name;

    @Column(length = 64)
    private String topic;

    @NotNull
    private Integer orderIndex;

    private Integer roadMapOrderIndex;

    @Column(length = 128)
    private String markdownSourceUrl;

    private String markdown;

    @NotNull
    private Boolean isHidden;

    @NotNull
    private Boolean isLocked;
}
