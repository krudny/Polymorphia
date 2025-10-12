package com.agh.polymorphia_backend.repository.user.role;

import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.user.UserDetailsRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long>, UserDetailsRepository {
    @Query(
            "select i from CourseGroup cg " +
                    "join  cg.instructor i " +
                    "where i.user.id=:userId and cg.id=:courseId"
    )
    @Override
    Optional<Instructor> findByUserIdAndCourseId(Long userId, Long courseId);
}