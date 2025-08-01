package com.agh.polymorphia_backend.model.grade.reward;

import com.agh.polymorphia_backend.model.course.reward.Chest;
import com.agh.polymorphia_backend.model.grade.CriterionGrade;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "assigned_chests")
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
public class AssignedChest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Include
    private Long id;

    @Setter(AccessLevel.NONE)
    @CreationTimestamp
    private ZonedDateTime receivedDate;

    @Builder.Default
    private Boolean opened = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criterion_grade_id")
    private CriterionGrade criterionGrade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chest_id")
    private Chest chest;

    @OneToMany(mappedBy = "assignedChest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private List<AssignedItem> assignedItems;
}
