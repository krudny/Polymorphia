package com.agh.polymorphia_backend.service.student;

import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class StudentService {
    private final static String STUDENT_NOT_ASSIGNED = "Student not assigned to any course group in course";
    private final UserService userService;
    private final StudentCourseGroupRepository studentCourseGroupRepository;

    public StudentCourseGroupAssignmentId getStudentCourseGroupAssignment(Long courseId) {
        User user = userService.getCurrentUser().getUser();
        Long studentId = user.getId();

        StudentCourseGroupAssignment assignment = studentCourseGroupRepository
                .findByIdStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, STUDENT_NOT_ASSIGNED));

        return assignment.getId();
    }
}
