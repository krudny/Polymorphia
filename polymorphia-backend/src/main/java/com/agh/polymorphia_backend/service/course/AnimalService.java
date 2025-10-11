package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AnimalService {
    private static final String ANIMAL_NOT_FOUND = "Animal not found";
    private final AnimalRepository animalRepository;
    private final CourseService courseService;
    private final AccessAuthorizer accessAuthorizer;
    private final UserService userService;

    public Animal getAnimal(Long userId, Long courseId) {
        return animalRepository.findByCourseIdAndStudentId(courseId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ANIMAL_NOT_FOUND));
    }

    public Long validateAndGetAnimalId(Long courseId) {
        Course course = courseService.getCourseById(courseId);
        accessAuthorizer.authorizeCourseAccess(course);
        AbstractRoleUser student = userService.getCurrentUser();

        return getAnimal(student.getUserId(), courseId).getId();
    }
}
