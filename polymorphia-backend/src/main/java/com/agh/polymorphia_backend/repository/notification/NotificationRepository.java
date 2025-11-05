package com.agh.polymorphia_backend.repository.notification;

import com.agh.polymorphia_backend.model.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUserIdOrderByCreatedAtDesc(Long userId);
    void deleteByIdAndUserId(Long id, Long userId);
}
