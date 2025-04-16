package com.agh.polymorphia_backend.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record ItemDto(
        long id,
        String name,
        String description,
        String imageUrl,
        int limit,
        long eventSectionId,
        List<Long> chestIds
) {
}
