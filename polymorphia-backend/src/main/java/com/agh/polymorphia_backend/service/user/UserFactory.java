package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.agh.polymorphia_backend.service.invitation.InvitationService.UNSUPPORTED_ROLE;

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


//        switch(inviteDTO.getRole()) {
//            case STUDENT -> createStudent(user, inviteDTO);
//            case INSTRUCTOR -> createInstructor(user, inviteDTO);
//            case COORDINATOR -> createCoordinator(user, inviteDTO);
//            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, UNSUPPORTED_ROLE);
//        }
    }

    public Student createStudent(InvitationRequestDTO inviteDTO) {
        User user = createUser(inviteDTO);

        return Student.builder()
                .user(user)
                .indexNumber(inviteDTO.getIndexNumber())
                .build();
    }

    public void createInstructor(User user, InvitationRequestDTO inviteDTO) {

    }

    public void createCoordinator(User user, InvitationRequestDTO inviteDTO) {

    }
}
