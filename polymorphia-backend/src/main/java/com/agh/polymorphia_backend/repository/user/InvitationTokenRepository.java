package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.InvitationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvitationTokenRepository extends JpaRepository<InvitationToken, Long> {
    Optional<InvitationToken> findByToken(String token);
    Optional<InvitationToken> findByEmail(String userEmail);
}
