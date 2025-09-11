package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFame;
import com.agh.polymorphia_backend.model.hall_of_fame.StudentScoreDetail;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.hall_of_fame.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.hall_of_fame.StudentScoreDetailRepository;
import com.agh.polymorphia_backend.util.NumberFormatter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class HallOfFameService {
    private static final String STUDENT_HOF_NOT_FOUND = "Student's Hall of Fame scores not found";
    private final HallOfFameRepository hallOfFameRepository;
    private final StudentScoreDetailRepository studentScoreDetailRepository;

    public HallOfFame getStudentHallOfFame(User user) {
        return hallOfFameRepository.findByStudentIdAndCourseId(user.getPreferredCourse().getId(), user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, STUDENT_HOF_NOT_FOUND));
    }

    public Map<Long, Map<String, String>> groupScoreDetails(List<Long> animalIds) {
        List<StudentScoreDetail> detailsList = studentScoreDetailRepository.findByAnimalIdIn(animalIds);
        Map<Long, Map<String, String>> result = new HashMap<>();
        for (StudentScoreDetail details : detailsList) {
            result.computeIfAbsent(details.getAnimalId(), id -> new HashMap<>())
                    .put(details.getEventSectionName(), NumberFormatter.formatToString(details.getRawXp()));
        }
        return result;
    }

}

