package com.agh.polymorphia_backend.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
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
@PrimaryKeyJoinColumn(name = "user_id")
public class Coordinator extends User {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(UserType.COORDINATOR);
    }
}
