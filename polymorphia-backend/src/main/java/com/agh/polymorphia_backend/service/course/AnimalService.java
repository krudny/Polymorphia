package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AnimalService {
    private static final String NO_ANIMAL_FOUND = "Student does not have animal in this course";

    private final AnimalRepository animalRepository;

    public Animal getAnimal(EventSection eventSection) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student student = (Student) authentication.getPrincipal();
        return animalRepository.findByCourseIdAndStudentId(eventSection.getCourse().getId(),
                student.getId()).orElseThrow(() -> new InvalidArgumentException(NO_ANIMAL_FOUND));
    }
}
