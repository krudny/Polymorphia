package com.agh.polymorphia_backend;

import org.junit.jupiter.api.BeforeAll;

import java.util.Locale;

public abstract class BaseTest {

    @BeforeAll
    static void forceUSLocale() {
        Locale.setDefault(Locale.US);
    }
}