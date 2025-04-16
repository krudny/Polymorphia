package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.model.event.EventSection;
import com.agh.polymorphia_backend.repository.event.CourseworkSectionRepository;
import com.agh.polymorphia_backend.repository.event.EventSectionRepository;
import com.agh.polymorphia_backend.repository.event.ProjectSectionRepository;
import com.agh.polymorphia_backend.repository.event.TestSectionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EventSectionService {
    private final EventSectionRepository eventSectionRepository;
    private final ProjectSectionRepository projectSectionRepository;
    private final TestSectionRepository testSectionRepository;
    private final CourseworkSectionRepository courseworkSectionRepository;

    public EventSection findById(Long id) {
        return eventSectionRepository.findById(id).orElse(null);
    }

}
