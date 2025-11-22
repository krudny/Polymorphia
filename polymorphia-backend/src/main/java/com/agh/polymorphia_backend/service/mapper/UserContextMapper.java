package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user_context.BaseUserDetailsResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.user.UserService;
import lombok.AllArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserContextMapper {
    private final UserService userService;
    private final UserMapper userMapper;

    public BaseUserDetailsResponseDto toBaseUserDetailsResponseDto(AbstractRoleUser roleUser) {
        UserType userType = userService.getUserRole(roleUser);
        User user = roleUser.getUser();
        Course course = user.getPreferredCourse();
        Hibernate.initialize(course);

        if (userType.equals(UserType.STUDENT)) {
            return userMapper.toStudentDetailsResponseDto(user, course);
        }

        return userMapper.toBaseUserDetailsResponseDto(user, userType);
    }
}
