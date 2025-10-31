package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.model.invitation.Token;
import com.agh.polymorphia_backend.repository.invitation.TokenRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class UserCleanupService {
    private final static String START_CLEANUP = "Starting cleanup of inactive users";
    private final static String END_CLEANUP = "Cleanup completed. Deleted {} expired tokens, {} used tokens and {} inactive users.";

    private UserRepository userRepository;
    private TokenRepository tokenRepository;

    @Scheduled(cron = "0 0 */6 * * ?")
    public void cleanupInactiveUsers() {
        log.info(START_CLEANUP);

        ZonedDateTime now = ZonedDateTime.now();

        List<String> expiredTokenEmails = tokenRepository
                .findByExpiryDateBeforeAndUsedFalse(now)
                .stream()
                .map(Token::getEmail)
                .toList();

        Integer deletedUserCount = userRepository.deleteUsersWithoutPasswordOrWithExpiredTokens(
                expiredTokenEmails
        );

        Integer deletedExpiredTokens = tokenRepository.deleteByExpiryDateBefore(now);
        Integer deletedUsedTokens = tokenRepository.deleteByUsedTrue();

        log.info(END_CLEANUP, deletedExpiredTokens, deletedUsedTokens, deletedUserCount);
    }
}

