package com.agh.polymorphia_backend.repository.submission;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.submission.SubmissionRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRequirementRepository extends JpaRepository<SubmissionRequirement, Long> {
    List<SubmissionRequirement> getSubmissionRequirementsByGradableEvent(GradableEvent gradableEvent);
}
