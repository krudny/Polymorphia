package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.UserCourseRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCourseRoleRepository extends JpaRepository<UserCourseRole, Long> {
    @Query(
            "select ucr from UserCourseRole ucr " +
                    "join ucr.user u " +
                    "where u.email=:email and u.preferredCourse=ucr.course"
    )
    Optional<UserCourseRole> findUserCourseRoleByEmail(String email);

    @Query(
            "select ucr from UserCourseRole ucr " +
                    "where ucr.user.id=:userId"
    )
    List<UserCourseRole> findAllByUserId(Long userId);

    Optional<UserCourseRole> findByUserIdAndCourseId(Long userId, Long courseId);
}
