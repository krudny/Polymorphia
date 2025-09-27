package com.agh.polymorphia_backend.service.course;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class CourseService {
    public static final String COURSE_NOT_FOUND = "Course does not exist or you're not authorized to access it";
    private final CourseRepository courseRepository;
    private final FetchClient fetchClient;

    public Course getCourseById(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, COURSE_NOT_FOUND));
    }
}
