package com.agh.polymorphia_backend.repository.course;

import com.agh.polymorphia_backend.model.user.student.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    @Query("select a from Animal a join a.studentCourseGroupAssignment cga  join cga.courseGroup c " +
            "where cga.student.user.id=:studentId AND c.course.id=:courseId")
    Optional<Animal> findByCourseIdAndStudentId(Long courseId, Long studentId);


    @Query("""
                select a from Animal a
                    where a.name = :name AND a.studentCourseGroupAssignment.courseGroup.course.id = :courseId
            """)
    Optional<Animal> findByNameAndCourseId(String name, Long courseId);


    @Query(value = """
                select a.id from animals a
                    join grades g on g.animal_id = a.id
                    join criteria_grades cg on g.id = cg.grade_id
                    join assigned_rewards ar on cg.id = ar.criterion_grade_id
                    where ar.id = :assignedChestId
            """, nativeQuery = true)
    Long findByAssignedChestId(Long assignedChestId);

}
