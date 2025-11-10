package com.agh.polymorphia_backend.service.gradable_event.project;

import com.agh.polymorphia_backend.model.project.ProjectGroup;
import com.agh.polymorphia_backend.model.user.Student;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectGroupService {
    public List<Student> getStudentsFromProjectGroup(ProjectGroup projectGroup) {
        return projectGroup.getAnimals().stream().map(animal -> animal.getStudentCourseGroupAssignment().getStudent())
                .toList();
    }
}
