package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsResponseDto;
import com.agh.polymorphia_backend.dto.response.course_groups.CourseGroupsShortResponseDto;
import com.agh.polymorphia_backend.repository.course.projections.CourseGroupProjection;
import com.agh.polymorphia_backend.repository.course.projections.CourseGroupShortProjection;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CourseGroupsMapper {
    public CourseGroupsResponseDto toCourseGroupResponseDto(CourseGroupProjection courseGroupProjection) {
        return CourseGroupsResponseDto.builder()
                .id(courseGroupProjection.getId())
                .name(courseGroupProjection.getName())
                .room(courseGroupProjection.getRoom())
                .studentCount(courseGroupProjection.getStudentCount())
                .build();
    }

    public CourseGroupsShortResponseDto toCourseGroupShortResponseDto(CourseGroupShortProjection courseGroupProjection) {
        return CourseGroupsShortResponseDto.builder()
                .id(courseGroupProjection.getId())
                .name(courseGroupProjection.getName())
                .build();
    }
}