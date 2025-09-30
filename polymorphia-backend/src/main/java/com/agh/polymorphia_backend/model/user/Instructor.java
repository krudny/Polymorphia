package com.agh.polymorphia_backend.model.user;

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
@Table(name = "instructors")
public class Instructor extends AbstractRoleUser {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(UserType.INSTRUCTOR);
    }
}
