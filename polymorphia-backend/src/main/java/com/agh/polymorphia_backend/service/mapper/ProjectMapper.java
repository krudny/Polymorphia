package com.agh.polymorphia_backend.service.mapper;

import com.agh.polymorphia_backend.dto.response.project.ProjectVariantResponseDto;
import com.agh.polymorphia_backend.model.project.ProjectVariant;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProjectMapper {

    public ProjectVariantResponseDto toProjectVariantResponseDto(ProjectVariant projectVariant) {
        return ProjectVariantResponseDto.builder()
                .id(projectVariant.getId())
                .name(projectVariant.getName())
                .categoryName(projectVariant.getCategory().getName())
                .imageUrl(projectVariant.getImageUrl())
                .shortCode(projectVariant.getShortCode())
                .build();

    }

}
