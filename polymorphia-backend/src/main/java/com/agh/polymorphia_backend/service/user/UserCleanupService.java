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
    private final static String END_CLEANUP = "Cleanup completed. Deleted {} inactive users";


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvitationTokenRepository invitationTokenRepository;

    @Scheduled(fixedDelay = 300000)
    public void cleanupInactiveUsers() {
        log.info(START_CLEANUP);

        ZonedDateTime now = ZonedDateTime.now();

        List<String> expiredTokenEmails = invitationTokenRepository
                .findByExpiryDateBeforeAndUsedFalse(now)
                .stream()
                .map(InvitationToken::getEmail)
                .toList();

        for(String expiredTokenEmail : expiredTokenEmails) {
            log.info("Deleting expired token {}", expiredTokenEmail);
        }

        int deletedCount = userRepository.deleteUsersWithoutPasswordOrExpiredTokens(
                expiredTokenEmails
        );

        log.info(END_CLEANUP, deletedCount);
    }
}

