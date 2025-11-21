package com.agh.polymorphia_backend.model.user.student;

import com.agh.polymorphia_backend.model.user.AbstractRoleUser;
import com.agh.polymorphia_backend.model.user.UserType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "students")
@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = true)
public class Student extends AbstractRoleUser {
    @NotNull
    @Column(unique = true)
    private Integer indexNumber;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(UserType.STUDENT);
    }
}
