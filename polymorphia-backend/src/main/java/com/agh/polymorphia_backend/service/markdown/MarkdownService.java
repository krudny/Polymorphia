package com.agh.polymorphia_backend.service.markdown;

import com.agh.polymorphia_backend.config.FetchClient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MarkdownService {
    private final FetchClient fetchClient;

    public void printMarkdown(String url) {
        String markdown = fetchClient.fetchStringFromUrl(url).block();
    }

}
