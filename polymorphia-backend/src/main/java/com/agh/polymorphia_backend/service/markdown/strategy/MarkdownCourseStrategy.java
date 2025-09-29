package com.agh.polymorphia_backend.service.markdown.strategy;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDTO;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDTO;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.repository.course.CourseRepository;
import com.agh.polymorphia_backend.service.course.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MarkdownCourseStrategy implements MarkdownStrategy {

    private static final String COURSE_MARKDOWN_UPDATE_FAILED = "Course rules markdown update failed";
    private static final String COURSE_MARKDOWN_SOURCE_URL_UNDEFINED = "Course rules markdown source url is undefined";
    private static final String COURSE_MARKDOWN_RESET_FAILED = "Course rules markdown reset failed";

    private final CourseRepository courseRepository;
    private final CourseService courseService;
    private final FetchClient fetchClient;

    @Override
    public MarkdownResponseDTO getMarkdown(Long resourceId) {
        Course course = courseService.getCourseById(resourceId);

        if (course.getMarkdown() == null || course.getMarkdown().isEmpty()) {
            return MarkdownResponseDTO.builder()
                    .markdown("")
                    .build();
        }

        return MarkdownResponseDTO.builder()
                .markdown(course.getMarkdown())
                .build();
    }

    @Override
    public SourceUrlMarkdownResponseDTO getMarkdownSourceUrl(Long resourceId) {
        Course course = courseService.getCourseById(resourceId);

        return SourceUrlMarkdownResponseDTO.builder()
                .sourceUrl(course.getMarkdownSourceUrl())
                .build();
    }

    @Override
    public void setMarkdown(Long resourceId, String markdown) {
        Course course = courseService.getCourseById(resourceId);

        try {
            course.setMarkdown(markdown);
            courseRepository.save(course);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, COURSE_MARKDOWN_UPDATE_FAILED);
        }
    }

    @Override
    public void resetMarkdown(Long resourceId) {
        Course course = courseService.getCourseById(resourceId);
        String sourceUrl = course.getMarkdownSourceUrl();

        if (sourceUrl == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, COURSE_MARKDOWN_SOURCE_URL_UNDEFINED);
        }

        try {
            String markdown = fetchClient.fetchStringFromUrl(sourceUrl).block();
            course.setMarkdown(markdown);
            courseRepository.save(course);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, COURSE_MARKDOWN_RESET_FAILED);
        }
    }
}
