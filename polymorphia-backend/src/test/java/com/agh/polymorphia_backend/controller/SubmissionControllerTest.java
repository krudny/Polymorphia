package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.dto.request.SubmissionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.test.annotation.Rollback;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.*;

public class SubmissionControllerTest extends ControllerTestConfig {

    @Value("classpath:responses/submission/submission_requirements.json")
    private Resource submissionRequirementsJson;

    @Value("classpath:responses/submission/submission_details.json")
    private Resource submissionDetailsJson;

    @Value("classpath:responses/submission/submission_details_after.json")
    private Resource submissionDetailsAfterJson;


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

    @Test
    @Rollback
    void putSubmissionDetails_ShouldUpdateForStudent() throws IOException {
        putEndpoint(
                "submissions/details?gradableEventId={gradableEventId}",
                "sampleuser@test.com",
                "password",
                200,
                Optional.of(SubmissionDetailsRequestDto.builder()
                        .target(StudentGroupTargetRequestDto.builder()
                                .groupId(1L).build())
                        .details(Map.of(
                                6L, SubmissionDetailsDto.builder()
                                        .url("https://www.google.com")
                                        .isLocked(true)
                                        .build(),
                                7L, SubmissionDetailsDto.builder()
                                        .url("https://www.bing.com")
                                        .isLocked(false)
                                        .build()
                        ))
                        .build()),
                7
        );

        String actualResponse = getEndpointWithBody(
                "submissions/details?gradableEventId={gradableEventId}",
                "sampleuser@test.com",
                "password",
                200,
                StudentTargetRequestDto.builder().id(12L).build(),
                7
        );

        assertJsonEquals(submissionDetailsAfterJson, actualResponse);
    }
}
