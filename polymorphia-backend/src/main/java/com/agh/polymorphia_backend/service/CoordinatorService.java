package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.model.user.Coordinator;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CoordinatorService extends UserService<Coordinator> {

    public CoordinatorService(UserRepository<Coordinator> userRepository) {
        super(userRepository);
    }
}
