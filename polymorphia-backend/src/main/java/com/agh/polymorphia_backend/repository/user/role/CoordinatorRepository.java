package com.agh.polymorphia_backend.repository.user.role;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CoordinatorRepository extends JpaRepository<Coordinator, Long>, UserCourseRoleRepository.UserDetailsRepository {
    @Query(
            "select c from Course co " +
                    "join  co.coordinator c " +
                    "where c.id=:userId and co.id=:courseId"
    )
    @Override
    Optional<Coordinator> findByUserIdAndCourseId(Long userId, Long courseId);
}
