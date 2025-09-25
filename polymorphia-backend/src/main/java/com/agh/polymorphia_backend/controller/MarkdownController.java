package com.agh.polymorphia_backend.controller;

import com.agh.polymorphia_backend.service.markdown.MarkdownService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/markdown")
public class MarkdownController {
    private final MarkdownService markdownService;

    @GetMapping("")
    public void printMarkdown(@RequestParam String url) {
        markdownService.printMarkdown(url);
    }
}
