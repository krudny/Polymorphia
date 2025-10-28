package com.agh.polymorphia_backend.service.submission;

import com.agh.polymorphia_backend.dto.response.submission.SubmissionRequirementResponseDto;
import com.agh.polymorphia_backend.model.event_section.EventSectionType;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import com.agh.polymorphia_backend.repository.submission.SubmissionRequirementRepository;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.mapper.SubmissionMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class SubmissionService {

    private static final String SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED = "Submissions for test event sections is not supported";

    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final SubmissionRequirementRepository submissionRequirementRepository;
    private final SubmissionMapper submissionMapper;


    public List<SubmissionRequirementResponseDto> getSubmissionRequirements(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        if (gradableEvent.getEventSection().getEventSectionType() == EventSectionType.TEST) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, SUBMISSION_TEST_SECTIONS_NOT_SUPPORTED);
        }

        accessAuthorizer.authorizeCourseAccess(gradableEvent.getEventSection().getCourse().getId());

        return submissionRequirementRepository
                .getSubmissionRequirementsByGradableEvent(gradableEvent)
                .stream()
                .sorted(Comparator.comparing(SubmissionRequirement::getOrderIndex))
                .map(submissionMapper::toSubmissionRequirementResponseDto)
                .toList();
    }
}
