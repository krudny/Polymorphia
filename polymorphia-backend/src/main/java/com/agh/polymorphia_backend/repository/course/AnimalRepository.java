package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.course.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    @Query("select a from Animal  a join a.student s  join a.courseGroup c " +
            "where s.id=:studentId AND c.course.id=:courseId")
    Optional<Animal> findByCourseIdAndStudentId(Long courseId, Long studentId);
}
