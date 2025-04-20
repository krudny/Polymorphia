package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.service.CoordinatorService;
import com.agh.polymorphia_backend.service.InstructorService;
import com.agh.polymorphia_backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final StudentService studentService;
    private final CoordinatorService coordinatorService;
    private final InstructorService instructorService;

    @PostMapping("/students")
    public ResponseEntity<Void> addStudent(@RequestBody Student user) {
        Long userId = studentService.addUser(user);
        return Util.getCreatedResponseEntity(userId);
    }

    @PostMapping("/instructors")
    public ResponseEntity<Void> addInstructor(@RequestBody Instructor user) {
        Long userId = instructorService.addUser(user);
        return Util.getCreatedResponseEntity(userId);
    }

    @PostMapping("/coordinators")
    public ResponseEntity<Void> addCoordinator(@RequestBody Coordinator user) {
        Long userId = coordinatorService.addUser(user);
        return Util.getCreatedResponseEntity(userId);
    }

    @GetMapping("/coordinators/{coordinatorId}")
    public ResponseEntity<Coordinator> getCoordinator(@PathVariable Long coordinatorId) {
        return ResponseEntity.ok(coordinatorService.getUserById(coordinatorId));
    }

    @GetMapping("/students/{studentId}")
    public ResponseEntity<Student> getStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(studentService.getUserById(studentId));
    }

    @GetMapping("/instructors/{instructorId}")
    public ResponseEntity<Instructor> getInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(instructorService.getUserById(instructorId));
    }
}
