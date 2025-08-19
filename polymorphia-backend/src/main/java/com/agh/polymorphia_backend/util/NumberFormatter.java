package com.agh.polymorphia_backend.util;

import lombok.experimental.UtilityClass;

import java.math.BigDecimal;
import java.util.Locale;

@UtilityClass
public final class NumberFormatter {
    private static final String NUMBER_FORMAT = "%.02f";

    public static String format(BigDecimal number) {
        return String.format(Locale.US, NUMBER_FORMAT, number);
    }
}
