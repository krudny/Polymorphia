package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getEndpoint;
import static com.agh.polymorphia_backend.controller.ControllerTestUtil.postEndpoint;
import static org.junit.jupiter.api.Assertions.*;

public class UserControllerTest extends ControllerTestConfig {
    private static final String QUOTE = "\"%s\"";
    @Autowired
    private UserRepository userRepository;

    @Test
    void getUserRole_ShouldReturnUserRole() {
        String actualResponse = getEndpoint("/users/role",
                "student@agh.com", "password", 200);
        assertEquals(actualResponse, String.format(QUOTE, UserType.STUDENT));
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
