package com.agh.polymorphia_backend.model.invitation;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Entity
@Table(name = "invitation_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvitationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @NotNull
    private String email;

    @NotNull
    private ZonedDateTime expiryDate;

    @Column(nullable = false)
    private boolean used = false;

    @NotNull
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = ZonedDateTime.now();
        }
        if (expiryDate == null) {
            expiryDate = ZonedDateTime.now().plusHours(72);
        }
    }
}
