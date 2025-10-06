package com.agh.polymorphia_backend.service.invitation;

import com.agh.polymorphia_backend.dto.request.user.InvitationRequestDTO;
import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.invitation.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserCourseRoleRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import com.agh.polymorphia_backend.repository.user.role.CoordinatorRepository;
import com.agh.polymorphia_backend.repository.user.role.InstructorRepository;
import com.agh.polymorphia_backend.repository.user.role.StudentRepository;
import com.agh.polymorphia_backend.service.EmailService;
import com.agh.polymorphia_backend.service.invitation_token.InvitationTokenService;
import com.agh.polymorphia_backend.service.user.UserFactory;
import com.agh.polymorphia_backend.service.validation.InvitationTokenValidator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class InvitationService {
    private final UserFactory userFactory;
    private final InvitationTokenValidator invitationTokenValidator;
    private final InvitationTokenService invitationTokenService;
    private final InvitationTokenRepository invitationTokenRepository;
    private final EmailService emailService;
    public static final String UNSUPPORTED_ROLE = "Unsupported role";
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CoordinatorRepository coordinatorRepository;
    private final InstructorRepository instructorRepository;
    private final UserCourseRoleRepository userCourseRoleRepository;

    @Transactional
    public void inviteUser(InvitationRequestDTO inviteDTO) {
        UserType role = inviteDTO.getRole();

        switch (role) {
            case STUDENT -> inviteStudent(inviteDTO);
//            case INSTRUCTOR -> inviteInstructor(inviteDTO);
//            case COORDINATOR -> inviteCoordinator(inviteDTO);
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, UNSUPPORTED_ROLE);
        }
    }

    @Transactional
    public void inviteStudent(InvitationRequestDTO inviteDTO) {
        String email = inviteDTO.getEmail();
        Integer indexNumber = inviteDTO.getIndexNumber();

        System.out.println("przed walidacją");

        invitationTokenValidator.validateBeforeInvitation(email, indexNumber);

        System.out.println("po walidacji");

        try {
            Student student = userFactory.createStudent(inviteDTO);

            System.out.println(student);

            userRepository.save(student.getUser());
            studentRepository.save(student);

            System.out.println(student);

//            InvitationToken newToken = invitationTokenService.createInvitationToken(inviteDTO);
//            invitationTokenRepository.save(newToken);

//            emailService.sendInvitationEmail(email, newToken);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send invitation");
        }
    }
}
