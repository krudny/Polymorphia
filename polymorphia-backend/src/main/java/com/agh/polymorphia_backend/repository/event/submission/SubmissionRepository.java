package com.agh.polymorphia_backend.repository.event.submission;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.gradable.Coursework;
import com.agh.polymorphia_backend.model.event.submission.CourseworkSubmission;
import com.agh.polymorphia_backend.model.event.submission.ProjectSubmission;
import com.agh.polymorphia_backend.model.event.submission.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query("SELECT s FROM CourseworkSubmission s  WHERE s.animal=:animal AND s.coursework=:coursework")
    Optional<CourseworkSubmission> findByAnimalAndCoursework(Animal animal, Coursework coursework);

    @Query("SELECT s FROM ProjectSubmission s  WHERE s.projectGroup.id=:projectGroupId")
    Optional<ProjectSubmission> findProjectSubmissionByProjectGroupId(Long projectGroupId);

    @Query("SELECT s FROM ProjectSubmission s JOIN s.projectGroup.animals a WHERE a.id = :animalId")
    Optional<ProjectSubmission> findProjectSubmissionByAnimalId(Long animalId);
}
