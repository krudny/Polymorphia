package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.config.StaticFileServerProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageStorageService {
    private final StaticFileServerProperties properties;

    public ImageStorageService(StaticFileServerProperties properties) {
        this.properties = properties;
    }

    @Getter
    @AllArgsConstructor
    public enum ImageType {
        CHEST("chest", "chests/");

        private final String name;
        private final String path;
    }

    public String saveImage(MultipartFile file, ImageType imageType) throws IOException {
        String uuid = UUID.randomUUID().toString();
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        if (extension == null) extension = "unknown";

        String filename = imageType.getName() + "-" + uuid + "." + extension;
        String relativePath = "images/" + imageType.getPath() + filename;

        Path fullPath = Paths.get(properties.rootDir(), relativePath)
                .toAbsolutePath().normalize();

        Files.createDirectories(fullPath.getParent());
        Files.write(fullPath, file.getBytes());

        return relativePath;
    }
}
