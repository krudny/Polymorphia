package com.agh.polymorphia_backend.repository.submission;

import com.agh.polymorphia_backend.model.submission.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
