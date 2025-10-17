package com.agh.polymorphia_backend.service.user;

import com.agh.polymorphia_backend.model.invitation.InvitationToken;
import com.agh.polymorphia_backend.repository.invitation.InvitationTokenRepository;
import com.agh.polymorphia_backend.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@Transactional
@Slf4j
public class UserCleanupService {
    private final static String START_CLEANUP = "Starting cleanup of inactive users";
    private final static String END_CLEANUP = "Cleanup completed. Deleted {} expired tokens, {} used tokens and {} inactive users.";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvitationTokenRepository invitationTokenRepository;

    @Scheduled(cron = "0 0 */6 * * ?")
    public void cleanupInactiveUsers() {
        log.info(START_CLEANUP);

        ZonedDateTime now = ZonedDateTime.now();

        List<String> expiredTokenEmails = invitationTokenRepository
                .findByExpiryDateBeforeAndUsedFalse(now)
                .stream()
                .map(InvitationToken::getEmail)
                .toList();

        Integer deletedUserCount = userRepository.deleteUsersWithoutPasswordOrExpiredTokens(
                expiredTokenEmails
        );

        Integer deletedExpiredTokens = invitationTokenRepository.deleteByExpiryDateBefore(now);
        Integer deletedUsedTokens = invitationTokenRepository.deleteByUsedTrue();

        log.info(END_CLEANUP, deletedExpiredTokens, deletedUsedTokens, deletedUserCount);
    }
}

