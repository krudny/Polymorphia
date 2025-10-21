package com.agh.polymorphia_backend.repository.invitation;

import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationTokenRepository extends JpaRepository<InvitationToken, Long> {
    Optional<InvitationToken> findByEmail(String email);

    Optional<InvitationToken> findByToken(String token);

    List<InvitationToken> findByExpiryDateBeforeAndUsedFalse(ZonedDateTime date);

    @Modifying
    @Query("DELETE FROM InvitationToken t WHERE t.expiryDate < :date")
    Integer deleteByExpiryDateBefore(@Param("date") ZonedDateTime date);

    @Modifying
    @Query("DELETE FROM InvitationToken t WHERE t.used = true")
    Integer deleteByUsedTrue();
}
