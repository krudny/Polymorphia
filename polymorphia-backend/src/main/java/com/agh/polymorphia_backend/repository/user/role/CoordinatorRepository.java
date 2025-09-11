package com.agh.polymorphia_backend.repository.user.role;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.repository.user.UserDetailsRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CoordinatorRepository extends JpaRepository<Coordinator, Long>, UserDetailsRepository {
    @Query(
            "select c from Course co " +
                    "join  co.coordinator c " +
                    "where c.user.id=:userId and co.id=:courseId"
    )
    @Override
    Optional<Coordinator> findByUserIdAndCourseId(Long userId, Long courseId);
}
