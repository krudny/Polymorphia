package com.agh.polymorphia_backend.service.markdown;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class MarkdownTypeConverter implements Converter<String, MarkdownType> {

    @Override
    public MarkdownType convert(String type) {
        return MarkdownType.fromValue(type);
    }
}
