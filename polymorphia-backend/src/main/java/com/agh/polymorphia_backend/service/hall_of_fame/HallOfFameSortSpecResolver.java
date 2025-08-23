package com.agh.polymorphia_backend.service.hall_of_fame;

import com.agh.polymorphia_backend.dto.request.HallOfFameRequestDto;
import com.agh.polymorphia_backend.model.hall_of_fame.OverviewField;
import com.agh.polymorphia_backend.repository.event.section.EventSectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class HallOfFameSortSpecResolver {
    private final EventSectionRepository eventSectionRepository;

    public HallOfFameSortSpec resolve(HallOfFameRequestDto requestDto) {
        String sortBy = requestDto.sortBy();

        Optional<String> overviewDbField = OverviewField.getDbField(sortBy);
        if (overviewDbField.isPresent()){
            return new OverviewFieldSort(overviewDbField.get());
        }

        boolean eventSectionExists = eventSectionRepository.existsByCourseIdAndName(requestDto.courseId(), sortBy);
        if (eventSectionExists){
            return new EventSectionSort();
        }

        throw new IllegalArgumentException("Invalid sortBy: " + sortBy);
    }
}
