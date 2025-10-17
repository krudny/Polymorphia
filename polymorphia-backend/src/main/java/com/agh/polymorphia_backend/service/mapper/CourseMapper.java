package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.model.user.UserType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseMapper {
    public AvailableCoursesResponseDto toAvailableCoursesResponseDto(Course course, UserType role) {
        Coordinator coordinator = course.getCoordinator();
        User user = coordinator.getUser();

        return AvailableCoursesResponseDto.builder()
                .id(course.getId())
                .coordinatorName(String.join(" ", user.getFirstName(), user.getLastName()))
                .name(course.getName())
                .imageUrl(course.getImageUrl())
                .userRole(role)
                .build();
    }
}
