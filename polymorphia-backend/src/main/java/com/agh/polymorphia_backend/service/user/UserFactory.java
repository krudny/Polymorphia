package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserFactory {

    public User createUser(InvitationRequestDTO inviteDTO) {
        return User.builder()
                .email(inviteDTO.getEmail())
                .firstName(inviteDTO.getFirstName())
                .lastName(inviteDTO.getLastName())
                .isActive(false)
                .build();
    }

    public Student createStudent(InvitationRequestDTO inviteDTO) {
        User user = createUser(inviteDTO);

        return Student.builder()
                .user(user)
                .indexNumber(inviteDTO.getIndexNumber())
                .build();
    }

    public Instructor createInstructor(InvitationRequestDTO inviteDTO) {
        User user = createUser(inviteDTO);

        return Instructor.builder()
                .user(user)
                .build();
    }

    public Coordinator createCoordinator(InvitationRequestDTO inviteDTO) {
        User user = createUser(inviteDTO);

        return Coordinator.builder()
                .user(user)
                .build();
    }
}