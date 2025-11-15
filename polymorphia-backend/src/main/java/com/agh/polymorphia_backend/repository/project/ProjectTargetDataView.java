package com.agh.polymorphia_backend.repository.project;

import java.math.BigDecimal;

public record ProjectTargetDataView(
    Long projectGroupId,
    Long studentId,
    String fullName,
    String animalName,
    String evolutionStage,
    String group,
    String imageUrl,
    BigDecimal gainedXp
) {}
