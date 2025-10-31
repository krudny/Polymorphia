package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.*;

public class SubmissionControllerTest extends ControllerTestConfig {

   @Value("classpath:responses/submission/submission_requirements.json")
    private Resource submissionRequirementsJson;

   @Value("classpath:responses/submission/submission_details.json")
    private Resource submissionDetailsJson;

   @Test
    void getSubmissionRequirements_ShouldReturnRequirements() throws IOException {
       String actualResponse = getEndpoint(
               "submissions/requirements?gradableEventId={gradableEventId}",
               "sampleuser@test.com",
               "password",
               200,
               4
       );

       assertJsonEquals(submissionRequirementsJson, actualResponse);
   }

   @Test
    void getSubmissionDetails_ShouldReturnDetailsForStudent() throws IOException {
       String actualResponse = getEndpointWithBody(
               "submissions/details?gradableEventId={gradableEventId}",
               "sampleuser@test.com",
               "password",
               200,
               StudentTargetRequestDto.builder().id(12L).build(),
               7
       );

       assertJsonEquals(submissionDetailsJson, actualResponse);
   }

    @Test
    void getSubmissionDetails_ShouldReturnDetailsForInstructor() throws IOException {
        String actualResponse = getEndpointWithBody(
                "submissions/details?gradableEventId={gradableEventId}",
                "sampleinstructor@test.com",
                "password",
                200,
                StudentTargetRequestDto.builder().id(12L).build(),
                7
        );

        assertJsonEquals(submissionDetailsJson, actualResponse);
    }
}
