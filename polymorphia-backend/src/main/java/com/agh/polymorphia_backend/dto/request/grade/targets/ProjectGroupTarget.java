package com.agh.polymorphia_backend.dto.request.grade.targets;

import lombok.Builder;

@Builder
public record ProjectGroupTarget(Long projectGroupId) implements GradedTarget {
}