package com.agh.polymorphia_backend.dto.request.csv;

import com.agh.polymorphia_backend.service.csv.CSVType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class StudentInvitationProcessRequestDto {
    @NotNull
    private CSVType type;

    @NotNull
    private List<String> csvHeaders;

    @NotNull
    private List<List<String>> data;
}
