package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.exception.database.InvalidArgumentException;
import com.agh.polymorphia_backend.model.user.User;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService<T extends User> {
    private static final String USER_NOT_FOUND = "User of id % does not exist in the database";
    private final UserRepository<T> userRepository;


    public UserService(UserRepository<T> userRepository) {
        this.userRepository = userRepository;
    }

    public Long addUser(T user) {
        return userRepository.save(user).getId();
    }

    public T getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new InvalidArgumentException(String.format(USER_NOT_FOUND, id)));
    }
}