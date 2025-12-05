package com.agh.polymorphia_backend.service.course.strategy;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

public interface EntityUpdateStrategy<T, R> {
    Function<T, String> getKeyExtractor();

    Function<R, String> getEntityKeyExtractor();

    Function<T, ?> getTypeExtractor();

    JpaRepository<R, Long> getRepository();

    List<R> findAllByKeys(List<String> keys, Long courseId);

    R createNewEntity(T dto);

    R updateEntity(R entity, T dto, Map<T, Long> orderIds, Long parentEntityId);

    default void flush() {
        getRepository().flush();
    }
}