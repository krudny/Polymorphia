package com.agh.polymorphia_backend.service.gradable_event;

import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.repository.course.GradableEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class GradableEventService {
    private final GradableEventRepository gradableEventRepository;

    public GradableEvent getGradableEventById(Long gradableEventId) {
        return gradableEventRepository
                .findById(gradableEventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gradable event nie został znaleziony."));
    }
}