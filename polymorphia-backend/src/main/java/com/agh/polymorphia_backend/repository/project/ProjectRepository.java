package com.agh.polymorphia_backend.repository.project;

import com.agh.polymorphia_backend.model.gradable_event.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

}
