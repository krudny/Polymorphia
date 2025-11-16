package com.agh.polymorphia_backend.service.gradable_event.project;

import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.project.ProjectGroupRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectGroupService {
    private final ProjectGroupRepository projectGroupRepository;

    public List<Student> getStudentsFromProjectGroup(ProjectGroup projectGroup) {
        return projectGroup.getAnimals().stream().map(animal -> animal.getStudentCourseGroupAssignment().getStudent())
                .toList();
    }

    public ProjectGroup findById(Long projectGroupId) {
        return projectGroupRepository.findById(projectGroupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono grupy projektowej"));
    }
}
