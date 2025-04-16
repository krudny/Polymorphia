package com.agh.polymorphia_backend.model.user;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "coordinators")
@PrimaryKeyJoinColumn(name = "user_id")
public class Coordinator extends User {
}
