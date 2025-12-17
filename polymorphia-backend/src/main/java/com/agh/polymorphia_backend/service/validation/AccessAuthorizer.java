package com.agh.polymorphia_backend.service.validation;

import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserCourseRole;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.model.user.student.Animal;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.repository.user.student.AnimalRepository;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static com.agh.polymorphia_backend.service.course.CourseService.COURSE_NOT_FOUND;

// TODO: to change to look up in user course role table
@Service
@AllArgsConstructor
public class AccessAuthorizer {
    private final UserService userService;
    private final UserCourseRoleRepository userCourseRoleRepository;
    private final InstructorRepository instructorRepository;
    private final StudentRepository studentRepository;
    private final AnimalRepository animalRepository;
    private final CourseRepository courseRepository;
    private final ProjectGroupRepository projectGroupRepository;

    public void authorizeCourseAccess(Long courseId) {
        AbstractRoleUser user = userService.getCurrentUser();

        if (!isCourseAccessAuthorized(user, courseId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, COURSE_NOT_FOUND);
        }
    }

    public void authorizeStudentDataAccess(Long courseId, Long studentId) {
        authorizeCourseAccess(courseId);
        Long userId = userService.getCurrentUser().getUser().getId();

        boolean authorized = switch (userService.getCurrentUserRole()) {
            case STUDENT -> userId.equals(studentId);
            case INSTRUCTOR -> hasInstructorAccessToUserInCourse(userId, courseId, studentId);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(userId, courseId);
            case UNDEFINED -> false;
        };

        if (!authorized) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Brak dostępu do danych użytkownika.");
        }
    }

    public void authorizeProjectGroupDetailsAccess(ProjectGroup projectGroup) {
        AbstractRoleUser user = userService.getCurrentUser();
        Long userId = user.getUser().getId();

        boolean authorized = switch (userService.getUserRole(user)) {
            case STUDENT -> projectGroupRepository.isStudentInProjectGroup(projectGroup, userId);
            case INSTRUCTOR -> projectGroup.getTeachingRoleUser().getUserId().equals(userId);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(userId, projectGroupRepository.getCourseIdByProjectGroup(projectGroup));
            case UNDEFINED -> false;
        };

        if (!authorized) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Brak dostępu do grupy projektowej.");
        }
    }

    public boolean authorizePreferredCourseSwitch(Course course) {
        User user = userService.getCurrentUser().getUser();

        UserCourseRole userCourseRole = userCourseRoleRepository
                .findByUserIdAndCourseId(user.getId(), course.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono roli użytkownika w kursie."));

        if (userCourseRole.getRole() == UserType.STUDENT) {
            Optional<Animal> animal = animalRepository.findByCourseIdAndStudentId(course.getId(), user.getId());
            return animal.isPresent();
        }

        return true;
    }

    public boolean hasAnyRole(List<UserType> roles) {
        AbstractRoleUser user = userService.getCurrentUser();
        return roles.contains(userService.getUserRole(user));
    }

    public boolean isCourseAccessAuthorized(AbstractRoleUser roleUser, Long courseId) {
        Long userId = roleUser.getUser().getId();
        return switch (userService.getUserRole(roleUser)) {
            case STUDENT -> isCourseAccessAuthorizedStudent(userId, courseId);
            case INSTRUCTOR -> isCourseAccessAuthorizedInstructor(userId, courseId);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(userId, courseId);
            case UNDEFINED -> isCourseAccessAuthorizedUndefined(userId, courseId);
        };
    }

    public void authorizeProjectGroupGrading(ProjectGroup projectGroup) {
        Long userId = userService.getCurrentUser().getUser().getId();

        boolean authorized = switch (userService.getCurrentUserRole()) {
            case INSTRUCTOR -> projectGroup.getTeachingRoleUser().getUserId().equals(userId);
            case COORDINATOR -> isCourseAccessAuthorizedCoordinator(userId, projectGroupRepository.getCourseIdByProjectGroup(projectGroup));
            default -> false;
        };

        if (!authorized) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Brak uprawnień do oceniania grupy projektowej.");
        }
    }

    private boolean hasInstructorAccessToUserInCourse(Long userId, Long courseId, Long studentId) {
        return instructorRepository.hasAccessToStudentInCourse(userId, courseId, studentId);
    }

    private boolean isCourseAccessAuthorizedCoordinator(Long userId, Long courseId) {
        return userId.equals(courseRepository.findCoordinatorIdByCourseId(courseId));
    }

    private boolean isCourseAccessAuthorizedInstructor(Long userId, Long courseId) {
        return instructorRepository.findByUserIdAndCourseId(userId, courseId).isPresent();
    }

    private boolean isCourseAccessAuthorizedStudent(Long userId, Long courseId) {
        return studentRepository.findByUserIdAndCourseIdAndAssignedToCourseGroup(userId, courseId).isPresent();
    }

    private boolean isCourseAccessAuthorizedUndefined(Long userId, Long courseId) {
        return isCourseAccessAuthorizedStudent(userId, courseId)
                || isCourseAccessAuthorizedInstructor(userId, courseId)
                || isCourseAccessAuthorizedCoordinator(userId, courseId);
    }
}
