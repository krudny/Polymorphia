package com.agh.polymorphia_backend.dto.response.user;


import com.agh.polymorphia_backend.dto.request.user.UserRequestDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class InstructorResponseDto extends UserRequestDto {
}
