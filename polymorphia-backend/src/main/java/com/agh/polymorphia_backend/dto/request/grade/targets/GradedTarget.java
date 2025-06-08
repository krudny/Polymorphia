package com.agh.polymorphia_backend.dto.request.grade.targets;


import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = AnimalTarget.class, name = "ANIMAL"),
        @JsonSubTypes.Type(value = ProjectGroupTarget.class, name = "PROJECT_GROUP")
})
public sealed interface GradedTarget permits AnimalTarget, ProjectGroupTarget {

}
