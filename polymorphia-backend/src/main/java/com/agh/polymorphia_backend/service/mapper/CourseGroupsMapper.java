package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseGroupsMapper {
    public CourseGroupsResponseDto toCourseGroupResponseDto(CourseGroup courseGroup) {
        return CourseGroupsResponseDto.builder()
                .id(courseGroup.getId())
                .name(courseGroup.getName())
                .details("Details")
                .studentCount(courseGroup.getStudentCourseGroupAssignments().size())
                .build();
    }

    public CourseGroupsShortResponseDto toCourseGroupShortResponseDto(CourseGroup courseGroup) {
        return CourseGroupsShortResponseDto.builder()
                .id(courseGroup.getId())
                .name(courseGroup.getName())
                .build();
    }
}