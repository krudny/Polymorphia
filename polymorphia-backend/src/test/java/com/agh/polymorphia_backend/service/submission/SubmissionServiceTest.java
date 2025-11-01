package com.agh.polymorphia_backend.service.submission;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;
import static com.agh.polymorphia_backend.service.submission.SubmissionService.SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.agh.polymorphia_backend.BaseTest;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.AssignmentSection;
import com.agh.polymorphia_backend.model.event_section.TestSection;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.mapper.SubmissionMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.web.server.ResponseStatusException;

class SubmissionServiceTest extends BaseTest {

    @Mock
    private GradableEventService gradableEventService;

    @Mock
    private AccessAuthorizer accessAuthorizer;

    @Mock
    private SubmissionRequirementRepository submissionRequirementRepository;

    @Spy
    private SubmissionMapper submissionMapper = new SubmissionMapper();

    @InjectMocks
    private SubmissionService submissionService;

    private GradableEvent assignment;
    private GradableEvent test;
    private Course course;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        course = Course.builder().id(1L).build();

        AssignmentSection assignmentSection = AssignmentSection.builder()
            .id(10L)
            .course(course)
            .build();

        TestSection testSection = TestSection.builder()
            .id(11L)
            .course(course)
            .build();

        assignment = GradableEvent.builder()
            .id(100L)
            .eventSection(assignmentSection)
            .build();

        test = GradableEvent.builder()
            .id(101L)
            .eventSection(testSection)
            .build();
    }

    @Test
    void shouldReturnSortedSubmissionRequirements() {
        SubmissionRequirement req1 = SubmissionRequirement.builder()
            .id(1L)
            .name("Req B")
            .orderIndex(2L)
            .build();

        SubmissionRequirement req2 = SubmissionRequirement.builder()
            .id(2L)
            .name("Req A")
            .orderIndex(1L)
            .build();

        when(
            gradableEventService.getGradableEventById(assignment.getId())
        ).thenReturn(assignment);

        doNothing()
            .when(accessAuthorizer)
            .authorizeCourseAccess(course.getId());

        when(
            submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                assignment
            )
        ).thenReturn(List.of(req1, req2));

        List<SubmissionRequirementResponseDto> result =
            submissionService.getSubmissionRequirements(assignment.getId());

        assertThat(result).hasSize(2);

        assertThat(result.get(0).orderIndex()).isEqualTo(1L);
        assertThat(result.get(0).name()).isEqualTo("Req A");

        assertThat(result.get(1).orderIndex()).isEqualTo(2L);
        assertThat(result.get(1).name()).isEqualTo("Req B");

        verify(accessAuthorizer).authorizeCourseAccess(course.getId());
    }

    @Test
    void shouldThrowWhenEventSectionTypeIsTest() {
        when(
            gradableEventService.getGradableEventById(test.getId())
        ).thenReturn(test);

        ResponseStatusException ex =  assertThrows(
                ResponseStatusException.class,
                () ->
            submissionService.getSubmissionRequirements(test.getId())
        );

        assertEquals(400, ex.getStatusCode().value());
        assertEquals(SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED, ex.getReason());
    }

    @Test
    void shouldThrowWhenAccessNotAuthorized() {
        when(
            gradableEventService.getGradableEventById(assignment.getId())
        ).thenReturn(assignment);
        doThrow(
            new ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND
            )
        )
            .when(accessAuthorizer)
            .authorizeCourseAccess(course.getId());

        ResponseStatusException ex = assertThrows(ResponseStatusException.class, () ->
            submissionService.getSubmissionRequirements(assignment.getId())
        );

        assertEquals(404, ex.getStatusCode().value());
    }

    @Test
    void shouldReturnEmptyListWhenNoRequirements() {
        when(
            gradableEventService.getGradableEventById(assignment.getId())
        ).thenReturn(assignment);
        doNothing()
            .when(accessAuthorizer)
            .authorizeCourseAccess(course.getId());
        when(
            submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                assignment
            )
        ).thenReturn(List.of());

        List<SubmissionRequirementResponseDto> result =
            submissionService.getSubmissionRequirements(assignment.getId());

        assertThat(result).isEmpty();
    }
}
