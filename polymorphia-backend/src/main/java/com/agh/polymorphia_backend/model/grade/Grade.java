package com.agh.polymorphia_backend.model.grade;

import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "grades")
@Data
@Builder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "gradable_event_id")
    @ToString.Exclude
    @JsonIgnore
    private GradableEvent gradableEvent;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "animal_id")
    @ToString.Exclude
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Animal animal;

    @NotNull
    private ZonedDateTime createdDate;

    @NotNull
    private ZonedDateTime modifiedDate;

    private String comment;

    @NotNull
    @OneToMany(
            mappedBy = "grade",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @ToString.Exclude
    @JsonIgnore
    @Builder.Default
    private List<CriterionGrade> criteriaGrades = new ArrayList<>();

    @PrePersist
    void onCreate() {
        if (createdDate == null) createdDate = ZonedDateTime.now();
        if (modifiedDate == null) modifiedDate = createdDate;
    }

    @PreUpdate
    void onUpdate() {
        modifiedDate = ZonedDateTime.now();
    }
}
