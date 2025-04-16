package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.service.CoordinatorService;
import com.agh.polymorphia_backend.service.InstructorService;
import com.agh.polymorphia_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final StudentService studentService;
    private final CoordinatorService coordinatorService;
    private final InstructorService instructorService;

    @PostMapping("/student/add")
    public ResponseEntity<Void> addStudent(@RequestBody Student user) {
        studentService.addUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/instructor/add")
    public ResponseEntity<Void> addInstructor(@RequestBody Instructor user) {
        instructorService.addUser(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/coordinator/add")
    public ResponseEntity<Void> addCoordinator(@RequestBody Coordinator user) {
        coordinatorService.addUser(user);
        return ResponseEntity.ok().build();
    }
}
