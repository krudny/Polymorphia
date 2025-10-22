package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailsRepository {
    Optional<? extends AbstractRoleUser> findByUserIdAndCourseId(Long userId, Long courseId);
}