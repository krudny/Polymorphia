package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.model.user.Student;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService extends UserService<Student> {
    public StudentService(UserRepository<Student> userRepository) {
        super(userRepository);
    }
}

