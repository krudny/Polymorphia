package com.agh.polymorphia_backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.io.IOException;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.*;

class KnowledgeBaseControllerTest extends ControllerTestConfig {
    @Value("classpath:responses/knowledge.base/evolution-stages.json")
    private Resource evolutionStagesJson;

    @Value("classpath:responses/knowledge.base/items.json")
    private Resource itemsJson;

    @Value("classpath:responses/knowledge.base/chests.json")
    private Resource chestsJson;

    @Test
    void getEvolutionStages_ShouldReturnEvolutionStages() throws IOException {
        String actualResponse = getEndpoint("/knowledge-base/evolution-stages?courseId={courseId}",
                "student@agh.com", "password",200,1);

        assertJsonEquals(evolutionStagesJson, actualResponse);
    }

    @Test
    void getItems_ShouldReturnItems() throws IOException {
        String actualResponse = getEndpoint("/knowledge-base/items?courseId={courseId}",
                "student@agh.com", "password",200,1);

        assertJsonEquals(itemsJson, actualResponse);
    }

    @Test
    void getChests_ShouldReturnChests() throws IOException {
        String actualResponse = getEndpoint("/knowledge-base/chests?courseId={courseId}",
                "student@agh.com", "password",200,1);

        assertJsonEquals(chestsJson, actualResponse);
    }

}
