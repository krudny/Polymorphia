package com.agh.polymorphia_backend.service.csv;

import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class CSVUtil {
    public static int getColumnIndex(String[] headers, String columnName) {
        return Arrays.asList(headers).indexOf(columnName);
    }

    public static Charset detectCharsetForPolish(MultipartFile file) {
        Charset[] charsets = {
                Charset.forName("Windows-1250"),
                StandardCharsets.UTF_8,
                Charset.forName("ISO-8859-2")
        };

        try {
            byte[] sample = new byte[1024];
            try (InputStream is = file.getInputStream()) {
                int bytesRead = is.read(sample);

                for (Charset charset : charsets) {
                    String decoded = new String(sample, 0, bytesRead, charset);

                    if (decoded.matches(".*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ].*") &&
                            !decoded.contains("?") &&
                            !decoded.contains("�")) {
                        return charset;
                    }
                }
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error during processing polish chars");
        }

        return Charset.forName("Windows-1250");
    }
}
