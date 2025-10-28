package com.agh.polymorphia_backend.service.submission;

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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class SubmissionServiceTest extends BaseTest {

    @Mock
    private GradableEventService gradableEventService;
    @Mock
    private AccessAuthorizer accessAuthorizer;
    @Mock
    private SubmissionRequirementRepository submissionRequirementRepository;
    @Mock
    private SubmissionMapper submissionMapper;

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

        SubmissionRequirementResponseDto dto1 = SubmissionRequirementResponseDto.builder()
                .id(2L)
                .name("Req A")
                .orderIndex(1L)
                .build();

        SubmissionRequirementResponseDto dto2 = SubmissionRequirementResponseDto.builder()
                .id(1L)
                .name("Req B")
                .orderIndex(2L)
                .build();

        when(gradableEventService.getGradableEventById(assignment.getId())).thenReturn(assignment);
        doNothing().when(accessAuthorizer).authorizeCourseAccess(course.getId());
        when(submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(assignment))
                .thenReturn(List.of(req1, req2));
        when(submissionMapper.toSubmissionRequirementResponseDto(req2)).thenReturn(dto1);
        when(submissionMapper.toSubmissionRequirementResponseDto(req1)).thenReturn(dto2);

        List<SubmissionRequirementResponseDto> result =
                submissionService.getSubmissionRequirements(assignment.getId());

        assertThat(result).hasSize(2);
        assertThat(result.get(0).orderIndex()).isEqualTo(1L);
        assertThat(result.get(1).orderIndex()).isEqualTo(2L);

        verify(accessAuthorizer).authorizeCourseAccess(course.getId());
        verify(submissionMapper, times(2)).toSubmissionRequirementResponseDto(any());
    }

    @Test
    void shouldThrowWhenEventSectionTypeIsTest() {
        when(gradableEventService.getGradableEventById(test.getId())).thenReturn(test);

        assertThatThrownBy(() -> submissionService.getSubmissionRequirements(test.getId()))
                .isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void shouldThrowWhenAccessNotAuthorized() {
        when(gradableEventService.getGradableEventById(assignment.getId())).thenReturn(assignment);
        doThrow(new ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND))
                .when(accessAuthorizer).authorizeCourseAccess(course.getId());

        assertThatThrownBy(() -> submissionService.getSubmissionRequirements(assignment.getId()))
                .isInstanceOf(ResponseStatusException.class);
    }

    @Test
    void shouldReturnEmptyListWhenNoRequirements() {
        when(gradableEventService.getGradableEventById(assignment.getId())).thenReturn(assignment);
        doNothing().when(accessAuthorizer).authorizeCourseAccess(course.getId());
        when(submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(assignment))
                .thenReturn(List.of());

        List<SubmissionRequirementResponseDto> result =
                submissionService.getSubmissionRequirements(assignment.getId());

        assertThat(result).isEmpty();
    }
}
