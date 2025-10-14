package com.agh.polymorphia_backend.repository.invitation;

import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationTokenRepository extends JpaRepository<InvitationToken, Long> {
    Optional<InvitationToken> findByEmail(String email);

    Optional<InvitationToken> findByToken(String token);

    List<InvitationToken> findByExpiryDateBeforeAndUsedFalse(ZonedDateTime date);
}
