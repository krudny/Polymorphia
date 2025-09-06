package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class HallOfFameService {
    private static final String STUDENT_HOF_NOT_FOUND = "Student's Hall of Fame scores not found";
    private final HallOfFameRepository hallOfFameRepository;

    public HallOfFame getStudentHallOfFame(Student student) {
        return hallOfFameRepository.findByStudentIdAndCourseId(student.getPreferredCourse().getId(), student.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_HOF_NOT_FOUND));
    }

}

