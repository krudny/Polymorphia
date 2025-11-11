package com.agh.polymorphia_backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Service
@ActiveProfiles("test")
public class ControllerTestUtil {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static String getEndpoint(String endpoint, String username, String password, Integer statusCode,
                                     Object... args) {
        return given().cookie("JSESSIONID", getStudentSessionId(username, password)).contentType(ContentType.JSON)
                .when().get(endpoint, args).then().statusCode(statusCode).extract().asString();
    }

    public static String postEndpoint(String endpoint, String username, String password, Integer statusCode,
                                      Optional<?> body, Object... args) {
        RequestSpecification requestSpecification =
                given().cookie("JSESSIONID", getStudentSessionId(username, password)).contentType(ContentType.JSON);

        body.ifPresent(requestSpecification::body);

        return requestSpecification.when().post(endpoint, args).then().statusCode(statusCode).extract().asString();
    }

    public static String putEndpoint(String endpoint, String username, String password, Integer statusCode,
                                     Optional<?> body, Object... args) {
        RequestSpecification requestSpecification =
                given().cookie("JSESSIONID", getStudentSessionId(username, password)).contentType(ContentType.JSON);

        body.ifPresent(requestSpecification::body);

        return requestSpecification.when().put(endpoint, args).then().statusCode(statusCode).extract().asString();
    }

    public static void assertJsonEquals(Resource expectedJson, String actualJson) throws IOException {
        JsonNode actualResponse = mapper.readTree(actualJson);
        JsonNode expectedResponse = mapper.readTree(getExpectedResponse(expectedJson));
        assertEquals(actualResponse, expectedResponse);
    }

    private static String getExpectedResponse(Resource resource) throws IOException {
        byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return new String(bdata, StandardCharsets.UTF_8);
    }

    private static String getStudentSessionId(String username, String password) {
        return getSessionId(username, password);
    }

    private static String getSessionId(String username, String password) {
        return given().contentType("application/x-www-form-urlencoded").formParam("username", username)
                .formParam("password", password).when().post("/login").then().statusCode(200).extract()
                .cookie("JSESSIONID");
    }

    public static void assertJsonEqualsIgnoringDates(Resource expected, String actual, List<String> datePropertyNames)
            throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode expectedNode = mapper.readTree(expected.getInputStream());
        JsonNode actualNode = mapper.readTree(actual);

        removeDateFields(expectedNode, datePropertyNames);
        removeDateFields(actualNode, datePropertyNames);

        assertEquals(expectedNode, actualNode);
    }

    public static void removeDateFields(JsonNode node, List<String> datePropertyNames) {
        if (node.isArray()) {
            node.forEach(object -> ControllerTestUtil.removeDateFields(object, datePropertyNames));
        } else if (node.isObject()) {
            ObjectNode objectNode = (ObjectNode) node;
            datePropertyNames.forEach(objectNode::remove);
            objectNode.elements()
                    .forEachRemaining(object -> ControllerTestUtil.removeDateFields(object, datePropertyNames));
        }
    }
}
