package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserCourseRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserCourseRoleRepository extends JpaRepository<UserCourseRole, Long> {
    @Query(
            "select ucr from UserCourseRole ucr " +
                    "join ucr.user u " +
                    "where u.email=:email and u.preferredCourse=ucr.course"
    )
    Optional<UserCourseRole> findUserCourseRoleByEmail(String email);

    List<UserCourseRole> findAllByUserId(Long userId);

    interface UserDetailsRepository {
        Optional<? extends User> findByUserIdAndCourseId(Long userId, Long courseId);
    }
}
