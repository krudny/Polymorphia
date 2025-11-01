package com.agh.polymorphia_backend.service.submission;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

import com.agh.polymorphia_backend.BaseTest;
import com.agh.polymorphia_backend.dto.request.SubmissionDetailsRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionDetailsDto;
import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.AssignmentSection;
import com.agh.polymorphia_backend.model.event_section.TestSection;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.submission.Submission;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import com.agh.polymorphia_backend.repository.submission.SubmissionRepository;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.mapper.SubmissionMapper;
import com.agh.polymorphia_backend.service.student.AnimalService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.http.HttpStatus;
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

    @Mock
    private UserService userService;

    @Mock
    private SubmissionRepository submissionRepository;

    @Mock
    private ProjectGroupRepository projectGroupRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private AnimalService animalService;

    @Captor
    private ArgumentCaptor<List<Submission>> saveSubmissionCaptor;

    @Captor
    private ArgumentCaptor<List<Submission>> deleteSubmissionCaptor;

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

        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () -> submissionService.getSubmissionRequirements(test.getId())
        );

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        assertEquals(
            "Submissions for test event sections is not supported",
            ex.getReason()
        );
    }

    @Test
    void shouldThrowWhenAccessNotAuthorized() {
        when(
            gradableEventService.getGradableEventById(assignment.getId())
        ).thenReturn(assignment);
        doThrow(
            new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Course not found"
            )
        )
            .when(accessAuthorizer)
            .authorizeCourseAccess(course.getId());

        ResponseStatusException ex = assertThrows(
            ResponseStatusException.class,
            () ->
                submissionService.getSubmissionRequirements(assignment.getId())
        );

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Course not found", ex.getReason());
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

    @Nested
    class GetSubmissionDetailsTests {

        @Test
        void getSubmissionDetails_whenStudentAndAssignment_shouldReturnDetails() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            List<SubmissionRequirement> requirements = List.of(
                SubmissionRequirement.builder().id(1L).build()
            );
            List<Submission> submissions = List.of(
                Submission.builder()
                    .submissionRequirement(requirements.getFirst())
                    .url("http://example.com")
                    .build()
            );

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(requirements);
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(submissions);

            // When
            Map<Long, SubmissionDetailsDto> result =
                submissionService.getSubmissionDetails(
                    assignment.getId(),
                    target
                );

            // Then
            assertThat(result).isNotNull();
            assertThat(result).hasSize(1);
            assertThat(result.get(1L).url()).isEqualTo("http://example.com");
            verify(accessAuthorizer).authorizeCourseAccess(course.getId());
        }
    }

    @Nested
    class PutSubmissionDetailsTests {

        @Test
        void putSubmissionDetails_whenStudentCreatesSubmission_shouldSaveSubmission() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            long requirementId = 1L;
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url("http://new.com")
                .isLocked(false)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirementId, detailsDto)
                );
            SubmissionRequirement requirement = SubmissionRequirement.builder()
                .id(requirementId)
                .isMandatory(true)
                .build();

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(List.of(requirement));
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(Collections.emptyList());
            when(animalService.getAnimal(anyLong(), anyLong())).thenReturn(
                Animal.builder().id(1L).build()
            );

            // When
            submissionService.putSubmissionDetails(
                assignment.getId(),
                requestDto
            );

            // Then
            verify(submissionRepository).saveAll(
                saveSubmissionCaptor.capture()
            );
            verify(submissionRepository).deleteAll(
                deleteSubmissionCaptor.capture()
            );
            List<Submission> savedSubmissions = saveSubmissionCaptor.getValue();
            assertThat(savedSubmissions).hasSize(1);
            Submission savedSubmission = savedSubmissions.getFirst();
            assertThat(savedSubmission.getUrl()).isEqualTo("http://new.com");
            assertThat(savedSubmission.isLocked()).isFalse();
            assertThat(
                savedSubmission.getSubmissionRequirement().getId()
            ).isEqualTo(requirementId);
            List<Submission> deletedSubmissions =
                deleteSubmissionCaptor.getValue();
            assertThat(deletedSubmissions).isEmpty();
        }

        @Test
        void putSubmissionDetails_whenStudentUpdatesLockedSubmission_shouldThrowException() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            long requirementId = 1L;
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url("http://new.com")
                .isLocked(false)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirementId, detailsDto)
                );
            SubmissionRequirement requirement = SubmissionRequirement.builder()
                .id(requirementId)
                .build();
            Submission existingSubmission = Submission.builder()
                .id(1L)
                .submissionRequirement(requirement)
                .isLocked(true)
                .url("http://old.com")
                .build();

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(List.of(requirement));
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(List.of(existingSubmission));

            // When & Then
            ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () ->
                    submissionService.putSubmissionDetails(
                        assignment.getId(),
                        requestDto
                    )
            );
            assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
            assertEquals("You can't change locked submission", ex.getReason());
        }

        @Test
        void putSubmissionDetails_whenStudentDeletesSubmission_shouldDeleteSubmission() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            long requirementId = 1L;
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url("")
                .isLocked(false)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirementId, detailsDto)
                );
            SubmissionRequirement requirement = SubmissionRequirement.builder()
                .id(requirementId)
                .isMandatory(false)
                .build();
            Submission existingSubmission = Submission.builder()
                .id(123L)
                .submissionRequirement(requirement)
                .isLocked(false)
                .url("http://old.com")
                .build();

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(List.of(requirement));
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(List.of(existingSubmission));

            // When
            submissionService.putSubmissionDetails(
                assignment.getId(),
                requestDto
            );

            // Then
            verify(submissionRepository).saveAll(
                saveSubmissionCaptor.capture()
            );
            verify(submissionRepository).deleteAll(
                deleteSubmissionCaptor.capture()
            );
            List<Submission> savedSubmissions = saveSubmissionCaptor.getValue();
            assertThat(savedSubmissions).isEmpty();
            List<Submission> deletedSubmissions =
                deleteSubmissionCaptor.getValue();
            assertThat(deletedSubmissions).hasSize(1);
            assertThat(deletedSubmissions.getFirst().getId()).isEqualTo(123L);
        }

        @Test
        void putSubmissionDetails_whenInstructorLocksSubmission_shouldUpdateAndLock() {
            // Given
            Instructor instructor = Instructor.builder().build();
            instructor.setUserId(99L);
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            long requirementId = 1L;
            Submission existingSubmission = Submission.builder()
                .id(1L)
                .submissionRequirement(
                    SubmissionRequirement.builder().id(requirementId).build()
                )
                .isLocked(false)
                .url("http://old-url.com")
                .build();
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url(existingSubmission.getUrl())
                .isLocked(true)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirementId, detailsDto)
                );

            when(userService.getCurrentUserRole()).thenReturn(
                UserType.INSTRUCTOR
            );
            when(userService.getCurrentUser()).thenReturn(instructor);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                studentRepository.findByUserIdAndGradableEventIdAndCourseGroupInstructorId(
                    student.getUserId(),
                    assignment.getId(),
                    instructor.getUserId()
                )
            ).thenReturn(Optional.of(student));
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(
                List.of(existingSubmission.getSubmissionRequirement())
            );
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(List.of(existingSubmission));

            // When
            submissionService.putSubmissionDetails(
                assignment.getId(),
                requestDto
            );

            // Then
            verify(submissionRepository).saveAll(
                saveSubmissionCaptor.capture()
            );
            verify(submissionRepository).deleteAll(
                deleteSubmissionCaptor.capture()
            );
            List<Submission> savedSubmissions = saveSubmissionCaptor.getValue();
            assertThat(savedSubmissions).hasSize(1);
            Submission savedSubmission = savedSubmissions.getFirst();
            assertThat(savedSubmission.getUrl()).isEqualTo(
                existingSubmission.getUrl()
            );
            assertThat(savedSubmission.isLocked()).isTrue();
            List<Submission> deletedSubmissions =
                deleteSubmissionCaptor.getValue();
            assertThat(deletedSubmissions).isEmpty();
        }

        @Test
        void putSubmissionDetails_whenRequestIsMissingRequirement_shouldThrowException() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            SubmissionRequirement requirement1 = SubmissionRequirement.builder()
                .id(1L)
                .build();
            SubmissionRequirement requirement2 = SubmissionRequirement.builder()
                .id(2L)
                .build();
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url("http://any.com")
                .isLocked(false)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirement1.getId(), detailsDto)
                );

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(List.of(requirement1, requirement2));

            // When & Then
            ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () ->
                    submissionService.putSubmissionDetails(
                        assignment.getId(),
                        requestDto
                    )
            );
            assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
            assertEquals(
                "Submission details must contain each requirement",
                ex.getReason()
            );
        }

        @Test
        void putSubmissionDetails_whenStudentChangesLock_shouldThrowException() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            long requirementId = 1L;
            Submission existingSubmission = Submission.builder()
                .id(1L)
                .submissionRequirement(
                    SubmissionRequirement.builder().id(requirementId).build()
                )
                .isLocked(false)
                .url("http://old.com")
                .build();
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url(existingSubmission.getUrl())
                .isLocked(true)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirementId, detailsDto)
                );

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(
                List.of(existingSubmission.getSubmissionRequirement())
            );
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(List.of(existingSubmission));

            // When & Then
            ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () ->
                    submissionService.putSubmissionDetails(
                        assignment.getId(),
                        requestDto
                    )
            );
            assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
            assertEquals(
                "Students can't change lock status of the submission",
                ex.getReason()
            );
        }

        @Test
        void putSubmissionDetails_whenStudentDeletesMandatorySubmission_shouldThrowException() {
            // Given
            Student student = Student.builder().build();
            student.setUserId(1L);
            TargetRequestDto target = new StudentTargetRequestDto(
                student.getUserId()
            );
            long requirementId = 1L;
            SubmissionDetailsDto detailsDto = SubmissionDetailsDto.builder()
                .url("")
                .isLocked(false)
                .build();
            SubmissionDetailsRequestDto requestDto =
                new SubmissionDetailsRequestDto(
                    target,
                    Map.of(requirementId, detailsDto)
                );
            SubmissionRequirement requirement = SubmissionRequirement.builder()
                .id(requirementId)
                .isMandatory(true)
                .build();
            Submission existingSubmission = Submission.builder()
                .id(123L)
                .submissionRequirement(requirement)
                .isLocked(false)
                .url("http://old.com")
                .build();

            when(userService.getCurrentUserRole()).thenReturn(UserType.STUDENT);
            when(userService.getCurrentUser()).thenReturn(student);
            when(
                gradableEventService.getGradableEventById(assignment.getId())
            ).thenReturn(assignment);
            when(
                submissionRequirementRepository.getSubmissionRequirementsByGradableEvent(
                    assignment
                )
            ).thenReturn(List.of(requirement));
            when(
                submissionRepository.getSubmissionsByGradableEventAndStudent(
                    assignment.getId(),
                    student.getUserId()
                )
            ).thenReturn(List.of(existingSubmission));

            // When & Then
            ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () ->
                    submissionService.putSubmissionDetails(
                        assignment.getId(),
                        requestDto
                    )
            );
            assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
            assertEquals("Mandatory submission is missing", ex.getReason());
        }
    }
}
