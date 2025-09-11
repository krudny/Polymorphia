package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.UserCourseRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserCourseRoleRepository extends JpaRepository<UserCourseRole, Long> {
    @Query(
            "select ucr from UserCourseRole ucr " +
                    "join ucr.id.user u " +
                    "where u.email=:email and u.preferredCourse=ucr.id.course"
    )
    Optional<UserCourseRole> findUserCourseRoleByEmail(String email);

    @Query(
            "select ucr from UserCourseRole ucr " +
                    "where ucr.id.user.id=:userId"
    )
    List<UserCourseRole> findAllByUserId(Long userId);

}
