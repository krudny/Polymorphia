package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.AbstractRoleUser;

import java.util.Optional;

public interface UserDetailsRepository {
    Optional<? extends AbstractRoleUser> findByUserIdAndCourseId(Long userId, Long courseId);
}