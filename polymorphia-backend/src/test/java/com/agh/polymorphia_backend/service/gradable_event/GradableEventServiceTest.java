package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.dto.request.target.StudentGroupTargetRequestDto;
import com.agh.polymorphia_backend.dto.request.target.TargetRequestDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.event_section.AssignmentSection;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class GradableEventServiceTest {

    @InjectMocks
    private GradableEventService gradableEventService;

    private GradableEvent assignment;
    private Course course;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        course = Course.builder().id(1L).build();

        AssignmentSection assignmentSection = AssignmentSection.builder()
                .id(10L)
                .course(course)
                .build();


        assignment = GradableEvent.builder()
                .id(100L)
                .eventSection(assignmentSection)
                .build();
    }

    @Test
    void validateTargetGradableEventAccess_whenGroupTargetOnAssignment_shouldThrowException() {
        TargetRequestDto target = new StudentGroupTargetRequestDto(1L);

        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () ->
                        gradableEventService.validateTargetGradableEventAccess(target, assignment)
        );
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        assertEquals(
                "Grupowy podmiot oceny jest wspierany jedynie przy projekcie.",
                ex.getReason()
        );
    }
}

