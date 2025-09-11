package com.agh.polymorphia_backend.model.user;

import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.Transient;

import java.util.Collection;
import java.util.List;

@Transient
@SuperBuilder
@NoArgsConstructor
public class UndefinedUser extends AbstractRoleUser {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(UserType.UNDEFINED);
    }
}
