package com.agh.polymorphia_backend.util;

import java.math.BigDecimal;
import java.util.Locale;

public final class NumberFormatter {
    private static final String NUMBER_FORMAT = "%.02f";

    private NumberFormatter() {}

    public static String format(BigDecimal number) {
        return String.format(Locale.US, NUMBER_FORMAT, number);
    }
}
