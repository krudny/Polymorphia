package com.agh.polymorphia_backend.service.csv;

import org.mozilla.universalchardet.UniversalDetector;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class CSVUtil {
    public static int getColumnIndex(String[] headers, String columnName) {
        return Arrays.asList(headers).indexOf(columnName);
    }

    public static Charset detectCharset(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            UniversalDetector detector = new UniversalDetector(null);

            byte[] buf = new byte[4096];
            int nread;
            while ((nread = inputStream.read(buf)) > 0 && !detector.isDone()) {
                detector.handleData(buf, 0, nread);
            }
            detector.dataEnd();

            String encoding = detector.getDetectedCharset();
            detector.reset();

            if (encoding != null) {
                if ("WINDOWS-1252".equals(encoding)) {
                    return Charset.forName("windows-1250");
                }

                return Charset.forName(encoding);
            }
            return StandardCharsets.UTF_8;
        } catch (IOException e) {
            return StandardCharsets.UTF_8;
        }
    }

    public static boolean isValidEncoding(String[] headers) {
        if (headers == null) return false;

        String combined = String.join(" ", headers);

        boolean hasCorruptedChars = combined.contains("Ă") ||
                combined.contains("Ĺ") ||
                combined.contains("â€") ||
                combined.contains("Å") ||
                combined.contains("™") ||
                combined.contains("ï¿½");

        return !hasCorruptedChars;
    }
}
