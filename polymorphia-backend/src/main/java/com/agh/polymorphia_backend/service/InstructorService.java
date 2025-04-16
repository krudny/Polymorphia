package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.model.user.Instructor;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class InstructorService extends UserService<Instructor> {
    public InstructorService(UserRepository<Instructor> userRepository) {
        super(userRepository);
    }
}

