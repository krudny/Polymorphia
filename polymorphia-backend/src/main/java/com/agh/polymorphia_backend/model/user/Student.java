package com.agh.polymorphia_backend.model.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "students")
@PrimaryKeyJoinColumn(name = "user_id")

@Data
@EqualsAndHashCode(callSuper = true)
public class Student extends User {

    @Column(unique = true)
    private int indexNumber;

}
