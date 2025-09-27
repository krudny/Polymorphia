package com.agh.polymorphia_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getEndpoint;
import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getExpectedResponse;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProfileControllerTest extends ControllerTestConfig {
    @Value("classpath:responses/profile/profile.json")
    private Resource profileJson;

    @Test
    void getProfile_ShouldReturnProfile() throws IOException {
        String actualResponse = getEndpoint("/profile?courseId={courseId}", "student@agh.com", "password", 200, 1);

        ObjectMapper mapper = new ObjectMapper();
        assertEquals(mapper.readTree(actualResponse), mapper.readTree(getExpectedResponse(profileJson)));
    }

}
