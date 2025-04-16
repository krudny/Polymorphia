package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class UserService<T extends User> {
    private final UserRepository<T> userRepository;

    public UserService(UserRepository<T> userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(T user) {
        userRepository.save(user);
    }
}