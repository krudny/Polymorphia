package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
