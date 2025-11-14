package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.CourseInvitationRequestDto;
import com.agh.polymorphia_backend.model.user.coordinator.Coordinator;
import com.agh.polymorphia_backend.model.user.instructor.Instructor;
import com.agh.polymorphia_backend.model.user.student.Student;
import com.agh.polymorphia_backend.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UserFactory {
    private static final String NULL_INDEX_NUMBER = "Index number cannot be null";

    public User createUser(CourseInvitationRequestDto inviteDTO) {
        return User.builder()
                .email(inviteDTO.getEmail())
                .firstName(inviteDTO.getFirstName())
                .lastName(inviteDTO.getLastName())
                .build();
    }

    public Student createStudent(CourseInvitationRequestDto inviteDTO) {
        User user = createUser(inviteDTO);

        if (inviteDTO.getIndexNumber() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, NULL_INDEX_NUMBER);
        }

        return Student.builder()
                .user(user)
                .indexNumber(inviteDTO.getIndexNumber())
                .build();
    }

    public Instructor createInstructor(CourseInvitationRequestDto inviteDTO) {
        User user = createUser(inviteDTO);

        return Instructor.builder()
                .user(user)
                .build();
    }

    public Coordinator createCoordinator(CourseInvitationRequestDto inviteDTO) {
        User user = createUser(inviteDTO);

        return Coordinator.builder()
                .user(user)
                .build();
    }
}