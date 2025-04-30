package com.agh.polymorphia_backend.dto.request.user;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = StudentRequestDto.class, name = "STUDENT"),
        @JsonSubTypes.Type(value = InstructorRequestDto.class, name = "INSTRUCTOR"),
        @JsonSubTypes.Type(value = CoordinatorRequestDto.class, name = "COORDINATOR")
})
public class UserRequestDto {
    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;

    @NotNull
    private UserType type;
}
