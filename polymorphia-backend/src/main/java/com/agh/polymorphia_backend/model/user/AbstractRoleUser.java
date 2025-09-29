package com.agh.polymorphia_backend.model.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@MappedSuperclass
public abstract class AbstractRoleUser implements UserDetails {
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Include
    protected User user;
    @Id
    private Long userId;

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public abstract Collection<? extends GrantedAuthority> getAuthorities();
}
