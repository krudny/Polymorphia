package com.agh.polymorphia_backend.repository.submission;

import com.agh.polymorphia_backend.model.submission.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    @Query("""
        SELECT s FROM Submission s
            WHERE s.submissionRequirement.gradableEvent.id = :gradableEventId
                AND s.animal.studentCourseGroupAssignment.student.userId = :studentId

    """)
    List<Submission> getSubmissionsByGradableEventIdAndStudentId(@Param("gradableEventId") Long gradableEventId,
                                                                 @Param("studentId") Long studentId);

}
