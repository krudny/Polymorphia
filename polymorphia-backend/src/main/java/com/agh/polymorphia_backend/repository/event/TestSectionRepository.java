package com.agh.polymorphia_backend.repository.event;

import com.agh.polymorphia_backend.model.event.TestSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestSectionRepository extends JpaRepository<TestSection, Integer> {
}
