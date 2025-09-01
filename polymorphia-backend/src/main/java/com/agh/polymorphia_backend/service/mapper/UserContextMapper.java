package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.user_context.AvailableCoursesResponseDto;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.user.Coordinator;
import org.springframework.stereotype.Service;

@Service
public class UserContextMapper {
    public AvailableCoursesResponseDto toAvailableCoursesResponseDto(Course course, String role) {
        Coordinator coordinator = course.getCoordinator();
        return AvailableCoursesResponseDto.builder()
                .id(course.getId())
                .coordinator(String.join(" ", coordinator.getFirstName(), coordinator.getLastName()))
                .name(course.getName())
                .userRole(role)
                .build();
    }
}
