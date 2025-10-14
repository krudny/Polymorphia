package com.agh.polymorphia_backend.repository.user;

import com.agh.polymorphia_backend.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Modifying
    @Query("""
        DELETE FROM User u 
        WHERE u.password IS NULL 
        OR u.email IN :expiredTokenEmails
    """)
    Integer deleteUsersWithoutPasswordOrExpiredTokens(@Param("expiredTokenEmails") List<String> expiredTokenEmails);
}
