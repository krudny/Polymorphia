package com.agh.polymorphia_backend.model.user.coordinator;

import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
@Table(name = "coordinators")
public class Coordinator extends TeachingRoleUser {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(UserType.COORDINATOR);
    }
}
