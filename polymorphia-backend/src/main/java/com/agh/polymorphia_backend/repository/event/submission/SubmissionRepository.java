package com.agh.polymorphia_backend.repository.event.submission;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Assignment;
import com.agh.polymorphia_backend.model.event.submission.AssignmentSubmission;
import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.agh.polymorphia_backend.model.event.submission.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query("SELECT s FROM AssignmentSubmission s  WHERE s.animal=:animal AND s.assignment=:assignment")
    Optional<AssignmentSubmission> findByAnimalAndAssignment(Animal animal, Assignment assignment);

    @Query("SELECT s FROM ProjectSubmission s  WHERE s.projectGroup.id=:projectGroupId")
    Optional<ProjectSubmission> findProjectSubmissionByProjectGroupId(Long projectGroupId);

    @Query("SELECT s FROM ProjectSubmission s JOIN s.projectGroup.animals a WHERE a.id = :animalId")
    Optional<ProjectSubmission> findProjectSubmissionByAnimalId(Long animalId);
}
