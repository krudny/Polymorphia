package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.request.user.StudentRequestDto;
import com.agh.polymorphia_backend.dto.request.user.UserRequestDto;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.dto.response.user.CoordinatorResponseDto;
import com.agh.polymorphia_backend.dto.response.user.InstructorResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentResponseDto;
import com.agh.polymorphia_backend.dto.response.user.UserResponseDto;
import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.model.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public User userRequestDtoToUser(UserRequestDto userRequestDto) {
        User.UserBuilder<? extends User, ?> userBuilder = userRequestDto.getType().equals(UserType.STUDENT) ?
                Student.builder().indexNumber(((StudentRequestDto) userRequestDto).getIndexNumber()) :
                userRequestDto.getType().equals(UserType.INSTRUCTOR) ? Instructor.builder()
                        : Coordinator.builder();

        return userBuilder
                .firstName(userRequestDto.getFirstName())
                .lastName(userRequestDto.getLastName())
                .email(userRequestDto.getEmail())
                .password(userRequestDto.getPassword())
                .build();
    }

    public UserResponseDto userToUserResponseDto(User user) {
        UserResponseDto.UserResponseDtoBuilder<? extends UserResponseDto, ?> userBuilder = user instanceof Student ?
                StudentResponseDto.builder()
                        .type(UserType.STUDENT)
                        .indexNumber(((Student) user).getIndexNumber()) :
                user instanceof Instructor ? InstructorResponseDto.builder().type(UserType.INSTRUCTOR)
                        : CoordinatorResponseDto.builder().type(UserType.COORDINATOR);

        return userBuilder
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}
