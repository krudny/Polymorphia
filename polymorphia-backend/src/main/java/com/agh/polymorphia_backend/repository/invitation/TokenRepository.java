package com.agh.polymorphia_backend.repository.invitation;

import com.agh.polymorphia_backend.model.Token.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByEmail(String email);

    Optional<Token> findByToken(String token);

    List<Token> findByExpiryDateBefore(ZonedDateTime date);

    @Modifying
    @Query("DELETE FROM Token t WHERE t.expiryDate < :date")
    Integer deleteByExpiryDateBefore(@Param("date") ZonedDateTime date);
}
