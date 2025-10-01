package com.agh.polymorphia_backend.repository.user.role;

import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.user.UserDetailsRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>, UserDetailsRepository {
    @Query(
            "select s from Animal a " +
                    "join  a.student s " +
                    "where s.user.id=:userId and a.courseGroup.id=:courseId"
    )
    @Override
    Optional<Student> findByUserIdAndCourseId(Long userId, Long courseId);
}
