package com.agh.polymorphia_backend.dto.request.target_list;


import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Builder
@EqualsAndHashCode()
public class TargetListRequestDto {
    @NotNull
    private String searchTerm;

    @NotNull
    private SearchBy searchBy;

    @NotBlank
    private String sortBy;

    @NotNull
    private SortOrder sortOrder;

    @NotNull
    private List<String> groups;
}
