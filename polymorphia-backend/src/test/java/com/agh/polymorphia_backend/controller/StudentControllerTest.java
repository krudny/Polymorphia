package com.agh.polymorphia_backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.assertJsonEquals;
import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getEndpoint;

public class StudentControllerTest extends ControllerTestConfig {
    @Value("classpath:responses/profile/profile.json")
    private Resource profileJson;

    @Test
    void getProfile_ShouldReturnProfile() throws IOException {
        String actualResponse = getEndpoint("students/profile?courseId={courseId}", "student@agh.com", "password", 200, 1);

        assertJsonEquals(profileJson, actualResponse);
    }

}
