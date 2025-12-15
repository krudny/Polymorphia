package com.agh.polymorphia_backend.service.project;

import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.user.student.Student;
import com.agh.polymorphia_backend.repository.grade.GradeRepository;
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
    private final GradeRepository gradeRepository;

    public List<Student> getStudentsFromProjectGroup(ProjectGroup projectGroup) {
        return projectGroup.getAnimals().stream().map(animal -> animal.getStudentCourseGroupAssignment().getStudent())
                .toList();
    }

    public ProjectGroup findById(Long projectGroupId) {
        return projectGroupRepository.findById(projectGroupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nie znaleziono grupy projektowej."));
    }

    public void save(ProjectGroup projectGroup) {
        if (projectGroup.getId() != null && gradeRepository.hasGroupGrades(projectGroup)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nie można edytować ocenionej grupy projektowej.");
        }
        projectGroupRepository.save(projectGroup);
    }

    public void delete(ProjectGroup projectGroup) {
        if (gradeRepository.hasGroupGrades(projectGroup)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nie można usunąć ocenionej grupy projektowej.");
        }
        projectGroupRepository.delete(projectGroup);
    }

    public List<Long> getStudentIdsFromProjectGroup(ProjectGroup projectGroup) {
        return projectGroupRepository.getStudentIdsByProjectGroup(projectGroup);
    }
}
