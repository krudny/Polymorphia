package com.agh.polymorphia_backend.service.markdown.strategy;

import com.agh.polymorphia_backend.config.FetchClient;
import com.agh.polymorphia_backend.dto.response.markdown.MarkdownResponseDto;
import com.agh.polymorphia_backend.dto.response.markdown.SourceUrlMarkdownResponseDto;
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
    private static final String COURSE_MARKDOWN_SOURCE_URL_UNDEFINED = "Course rules markdown source URL is undefined";
    private static final String COURSE_MARKDOWN_RESET_FAILED = "Course rules markdown reset failed";

    private final CourseRepository courseRepository;
    private final CourseService courseService;
    private final FetchClient fetchClient;

    @Override
    public MarkdownResponseDto getMarkdown(Long resourceId) {
        Course course = courseService.getCourseById(resourceId);

        if (course.getMarkdown() == null || course.getMarkdown().isEmpty()) {
            return MarkdownResponseDto.builder()
                    .markdown("")
                    .build();
        }

        return MarkdownResponseDto.builder()
                .markdown(course.getMarkdown())
                .build();
    }

    @Override
    public SourceUrlMarkdownResponseDto getMarkdownSourceUrl(Long resourceId) {
        Course course = courseService.getCourseById(resourceId);

        return SourceUrlMarkdownResponseDto.builder()
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
