package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByIndexNumber(Integer indexNumber);
}
