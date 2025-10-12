package com.agh.polymorphia_backend.service.student;

import com.agh.polymorphia_backend.dto.request.student.CreateAnimalRequestDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AnimalService {
    private static final String ANIMAL_NOT_FOUND = "Animal not found";
    private static final String ANIMAL_ALREADY_EXISTS = "Animal already exists";
    private final AnimalRepository animalRepository;
    private final UserService userService;

    public Animal getAnimal(Long userId, Long courseId) {
        return animalRepository.findByCourseIdAndStudentId(courseId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ANIMAL_NOT_FOUND));
    }

    public boolean isAnimalValid(Long userId, Long courseId) {
        Optional<Animal> animal = animalRepository.findByCourseIdAndStudentId(courseId, userId);
        return animal.isPresent() && animal.get().getName() != null;
    }

    public void createAnimal(CreateAnimalRequestDto requestDTO) {
        User user = userService.getCurrentUser().getUser();
        Animal animal = getAnimal(user.getId(), requestDTO.getCourseId());

        if (animal.getName() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ANIMAL_ALREADY_EXISTS);
        }

        try {
            animal.setName(requestDTO.getAnimalName());
            animalRepository.save(animal);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
