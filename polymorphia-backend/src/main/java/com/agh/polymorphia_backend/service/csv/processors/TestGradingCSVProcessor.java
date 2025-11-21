package com.agh.polymorphia_backend.service.csv.processors;

import com.agh.polymorphia_backend.dto.request.csv.process.TestGradingRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.CriterionGradeRequestDto;
import com.agh.polymorphia_backend.dto.request.grade.GradeRequestDto;
import com.agh.polymorphia_backend.dto.request.target.StudentTargetRequestDto;
import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.service.csv.CSVHeaders;
import com.agh.polymorphia_backend.service.csv.CSVUtil;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.grade.GradingService;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class TestGradingCSVProcessor {

    private final UserService userService;
    private final GradingService gradingService;
    private final GradableEventService gradableEventService;


    @Transactional
    public void process(TestGradingRequestDto request) {
        List<String> headers = request.getCsvHeaders();

        int indexNumberIdx = CSVUtil.getColumnIndex(headers, CSVHeaders.INDEX_NUMBER.getValue());
        int gainedXpIdx = CSVUtil.getColumnIndex(headers, CSVHeaders.XP.getValue());

        for (List<String> row : request.getData()) {
            Integer indexNumber = Integer.valueOf(row.get(indexNumberIdx));
            BigDecimal xp = BigDecimal.valueOf(Double.parseDouble(row.get(gainedXpIdx)));
            GradeRequestDto gradeRequestDto = createGradeRequestDto(indexNumber, xp, request);

            gradingService.submitGrade(gradeRequestDto);
        }
    }


    private GradeRequestDto createGradeRequestDto(Integer indexNumber, BigDecimal xp, TestGradingRequestDto request) {
        Long studentId = userService.getStudentByIndexNumber(indexNumber).getUser().getId();
        List<Criterion> gradableEventCriteria = gradableEventService.getGradableEventById((request.getGradableEventId()))
                .getCriteria();

        if (gradableEventCriteria.size() != 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Import CSV ocen można wykonać tylko dla wydarzeń o jednym kryterium.");
        }

        Long criterionId = gradableEventCriteria.getFirst().getId();

        Map<Long, CriterionGradeRequestDto> criteria = Map.of(
                criterionId,
                CriterionGradeRequestDto.builder()
                        .gainedXp(xp)
                        .build()
        );

        return GradeRequestDto.builder()
                .gradableEventId(request.getGradableEventId())
                .target(
                        StudentTargetRequestDto.builder()
                                .id(studentId)
                                .build()
                )
                .criteria(criteria)
                .build();

    }
}
