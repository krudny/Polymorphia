package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getEndpoint;
import static com.agh.polymorphia_backend.controller.ControllerTestUtil.postEndpoint;
import static org.junit.jupiter.api.Assertions.*;

public class UserControllerTest extends ControllerTestConfig {
    @Autowired
    private UserRepository userRepository;

    @Test
    void isPreferredCourseSet_ShouldReturnTrueWhenSet() {
        String actualResponse = getEndpoint("/users/preferred-course/exists",
                "student@agh.com", "password", 200);
        assertEquals(actualResponse, "true");
    }

    @Test
    void isPreferredCourseSet_ShouldReturnFalseWhenNotSet() {
        String actualResponse = getEndpoint("/users/preferred-course/exists",
                "coordinator@agh.com", "password", 200);
        assertEquals(actualResponse, "false");
    }

    @Test
    void setPreferredCourse_success() {
        String actualResponse = postEndpoint("/users/preferred-course?courseId={courseId}",
                "instructor@agh.com", "password", 200, 1);

        User instructor = userRepository.findByEmail("instructor@agh.com")
                .orElseThrow();

        assertEquals(1L, instructor.getPreferredCourse().getId());
        assertTrue(actualResponse.isEmpty());
    }

    @Test
    void setPreferredCourse_courseSwitchUnauthorized() {
        postEndpoint("/users/preferred-course?courseId={courseId}",
                "instructor@agh.com", "password", 404, 2);

        User instructor = userRepository.findByEmail("instructor@agh.com")
                .orElseThrow();

        assertNull(instructor.getPreferredCourse());
    }
}
