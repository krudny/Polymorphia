package com.agh.polymorphia_backend.model.email_event;

import com.agh.polymorphia_backend.dto.request.user.ForgotPasswordRequestDto;
import com.agh.polymorphia_backend.model.token.Token;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ForgotPasswordEvent {
    private final ForgotPasswordRequestDto requestDTO;
    private final Token token;
}