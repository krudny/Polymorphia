package com.agh.polymorphia_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.test.annotation.DirtiesContext;

import java.io.IOException;

import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getEndpoint;
import static com.agh.polymorphia_backend.controller.ControllerTestUtil.getExpectedResponse;
import static org.junit.jupiter.api.Assertions.assertEquals;

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

        ObjectMapper mapper = new ObjectMapper();
        assertEquals(mapper.readTree(actualResponse), mapper.readTree(getExpectedResponse(evolutionStagesJson)));
    }

    @Test
    void getItems_ShouldReturnItems() throws IOException {
        String actualResponse = getEndpoint("/knowledge-base/items?courseId={courseId}",
                "student@agh.com", "password",200,1);

        ObjectMapper mapper = new ObjectMapper();
        assertEquals(mapper.readTree(actualResponse), mapper.readTree(getExpectedResponse(itemsJson)));
    }

    @Test
    void getChests_ShouldReturnChests() throws IOException {
        String actualResponse = getEndpoint("/knowledge-base/chests?courseId={courseId}",
                "student@agh.com", "password",200,1);

        ObjectMapper mapper = new ObjectMapper();
        assertEquals(mapper.readTree(actualResponse), mapper.readTree(getExpectedResponse(chestsJson)));
    }

}
