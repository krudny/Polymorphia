package com.agh.polymorphia_backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.*;

public class SubmissionControllerTest extends ControllerTestConfig {

   @Value("classpath:responses/submission/submission_requirements.json")
    private Resource submissionRequirementsJson;

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
}
