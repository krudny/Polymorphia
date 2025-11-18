package com.agh.polymorphia_backend.service.criterion;

import com.agh.polymorphia_backend.model.criterion.Criterion;
import com.agh.polymorphia_backend.repository.criterion.CriterionRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class CriterionService {

    private final CriterionRepository criterionRepository;

    public Criterion findById(Long id) {
        return criterionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono kryterium."));
    }
}
