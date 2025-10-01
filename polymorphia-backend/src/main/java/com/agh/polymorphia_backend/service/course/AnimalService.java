package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AnimalService {
    private static final String ANIMAL_NOT_FOUND = "Animal not found";
    private final AnimalRepository animalRepository;

    public Animal getAnimal(Long userId, Long courseId) {
        return animalRepository.findByCourseIdAndStudentId(courseId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ANIMAL_NOT_FOUND));
    }
}
