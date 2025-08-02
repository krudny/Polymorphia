package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.HallOfFame;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.EvolutionStage;
import com.agh.polymorphia_backend.model.event.section.EventSection;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.HallOfFameRepository;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.EvolutionStagesRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
public class AnimalService {
    private static final String NO_ANIMAL_FOUND = "Student does not have animal in this course";

    private final AnimalRepository animalRepository;
    private final HallOfFameRepository hallOfFameRepository;
    private final EvolutionStagesRepository evolutionStagesRepository;

    public Animal getAnimal(EventSection eventSection) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Student student = (Student) authentication.getPrincipal();
        return animalRepository.findByCourseIdAndStudentId(eventSection.getCourse().getId(),
                student.getId()).orElseThrow(() -> new InvalidArgumentException(NO_ANIMAL_FOUND));
    }

    public StudentDetailsResponseDto getStudentDetails(Long studentId, Long courseId) {
        Animal animal = animalRepository.findByCourseIdAndStudentId(courseId, studentId).orElseThrow(() -> new InvalidArgumentException(NO_ANIMAL_FOUND));
        EvolutionStage evolutionStage = evolutionStagesRepository.findCurrentStage(courseId, animal.getHallOfFame().getTotalXp());
        return StudentDetailsResponseDto.builder()
                .studentName(animal.getStudent().getFirstName() + " " + animal.getStudent().getLastName()) // TODO: decidte if should be present or not in the response
                .animalName(animal.getName())
                .evolutionStage(evolutionStage.getName())
                .imageUrl(evolutionStage.getImageUrl())
                .group(animal.getCourseGroup().getName())
                .position(hallOfFameRepository.findRankByAnimalId(animal.getId()))
                .build();
    }
}
