package com.agh.polymorphia_backend.service.student;

import com.agh.polymorphia_backend.dto.request.student.CreateAnimalRequestDto;
import com.agh.polymorphia_backend.model.course.Animal;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignment;
import com.agh.polymorphia_backend.model.course.StudentCourseGroupAssignmentId;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.course.AnimalRepository;
import com.agh.polymorphia_backend.repository.course.StudentCourseGroupRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AnimalService {
    private static final String ANIMAL_NOT_FOUND = "Animal not found";
    private static final String STUDENT_NOT_FOUND = "Student not found";
    private static final String STUDENT_NOT_INVITED = "Student was not invited";
    private static final String FAILED_TO_CREATE_ANIMAL = "Failed to create animal";
    private final AnimalRepository animalRepository;
    private final UserService userService;
    private final StudentCourseGroupRepository studentCourseGroupRepository;
    private final StudentRepository studentRepository;

    public Animal getAnimal(Long userId, Long courseId) {
        return animalRepository.findByCourseIdAndStudentId(courseId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ANIMAL_NOT_FOUND));
    }

    public Long getAnimalIdForCurrentUser(Long courseId) {
        AbstractRoleUser student = userService.getCurrentUser();
        return getAnimal(student.getUserId(), courseId).getId();
    }

    public boolean hasAnimalInCourse(Long courseId) {
        User user = userService.getCurrentUser().getUser();
        return animalRepository.findByCourseIdAndStudentId(courseId, user.getId()).isPresent();
    }

    @Transactional
    public void createAnimal(CreateAnimalRequestDto requestDTO) {
        User user = userService.getCurrentUser().getUser();

        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, STUDENT_NOT_FOUND));

        Animal animal = Animal.builder()
                .name(requestDTO.getAnimalName())
                .build();

        try {
            StudentCourseGroupAssignmentId assignmentId = StudentCourseGroupAssignmentId.builder()
                    .studentId(student.getUserId())
                    .courseGroupId(requestDTO.getCourseGroupId())
                    .build();

            StudentCourseGroupAssignment assignment = studentCourseGroupRepository.findById(assignmentId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, STUDENT_NOT_INVITED));

            Animal savedAnimal = animalRepository.save(animal);

            studentCourseGroupRepository.save(assignment);
            assignment.setAnimal(savedAnimal);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, FAILED_TO_CREATE_ANIMAL);
        }
    }
}
