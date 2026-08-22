package com.agh.polymorphia_backend.service.task;

import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.server.ResponseStatusException;

@Component
public class TaskSubmissionErrorMapper {

    public String toUserMessage(Exception exception) {
        if (exception instanceof ResourceAccessException
zz            || exception instanceof RestClientException
            || exception instanceof ResponseStatusException) {
            return "Usługa wykonywania kodu jest chwilowo niedostępna. Spróbuj ponownie później.";
        }

        return "Wystąpił błąd podczas sprawdzania rozwiązania.";
    }
}
