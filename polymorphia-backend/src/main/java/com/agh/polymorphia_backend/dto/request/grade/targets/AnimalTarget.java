package com.agh.polymorphia_backend.dto.request.grade.targets;

import lombok.Builder;

@Builder
public record AnimalTarget(Long animalId) implements GradedTarget {
}
