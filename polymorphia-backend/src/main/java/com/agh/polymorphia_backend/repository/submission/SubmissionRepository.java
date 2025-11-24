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
                    JOIN s.submissionRequirement sr
                    JOIN sr.gradableEvent ge
                    JOIN s.animal a
                    JOIN a.studentCourseGroupAssignment scga
                    JOIN scga.student st
                    WHERE ge.id = :gradableEventId
                        AND st.userId = :studentId
            
            """)
    List<Submission> getSubmissionsByGradableEventAndStudent(@Param("gradableEventId") Long gradableEventId,
                                                             @Param("studentId") Long studentId);

}
