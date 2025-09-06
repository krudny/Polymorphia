package com.agh.polymorphia_backend.model.user;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.Transient;

import java.util.Collection;
import java.util.List;

@Transient
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
public class UndefinedUser extends User {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(UserType.UNDEFINED);
    }
}
