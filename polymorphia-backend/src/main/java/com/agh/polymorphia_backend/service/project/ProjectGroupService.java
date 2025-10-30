package com.agh.polymorphia_backend.service.project;

import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class ProjectGroupService {
    private static final String PROJECT_GROUP_NOT_FOUND = "Project group not found";

    private final ProjectGroupRepository projectGroupRepository;

    public ProjectGroup getProjectGroupByIdAndStudentId(Long projectGroupId, Long studentId) {
        return projectGroupRepository
                .getProjectGroupByIdAndStudentId(projectGroupId, studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, PROJECT_GROUP_NOT_FOUND));
    }

    public ProjectGroup getProjectGroupByIdAndInstructorId(Long projectGroupId, Long instructorId) {
        return projectGroupRepository
                .getProjectGroupByIdAndInstructorId(projectGroupId, instructorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, PROJECT_GROUP_NOT_FOUND));
    }
}
