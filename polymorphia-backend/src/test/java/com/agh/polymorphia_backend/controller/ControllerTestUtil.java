package com.agh.polymorphia_backend.controller;

import io.restassured.http.ContentType;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static io.restassured.RestAssured.given;

@Service
@ActiveProfiles("test")
public class ControllerTestUtil {
    public static String callEndpoint(String endpoint, Object... args) {
        return given()
                .cookie("JSESSIONID", getStudentSessionId())
                .contentType(ContentType.JSON)
                .when()
                .get(endpoint, args)
                .then()
                .statusCode(200)
                .extract()
                .asString();
    }

    public static String getExpectedResponse(Resource resource) throws IOException {
        byte[] bdata = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return new String(bdata, StandardCharsets.UTF_8);
    }

    private static String getStudentSessionId() {
        return getSessionId("student@agh.com", "password");
    }

    private static String getSessionId(String username, String password) {
        return given()
                .contentType("application/x-www-form-urlencoded")
                .formParam("username", username)
                .formParam("password", password)
                .when()
                .post("/login")
                .then()
                .statusCode(200)
                .extract()
                .cookie("JSESSIONID");
    }
}
