package com.agh.polymorphia_backend.model.course.prize;


import com.agh.polymorphia_backend.model.course.Course;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "chests")
public class Chest {
    @ManyToMany(mappedBy = "chests", fetch = FetchType.LAZY)
    Set<Item> items;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "behavior", columnDefinition = "chest_behavior")
    @JdbcType(PostgreSQLEnumJdbcType.class)
    private ChestBehavior behavior;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chest chest = (Chest) o;
        return id != null && id.equals(chest.id);
    }
}
