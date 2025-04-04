package com.todoapplication.todo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "jwt_configs")
@Setter
@Getter
@AllArgsConstructor @NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class JwtConfig extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String secretKey;

    @Column(nullable = false, name = "expiration_time")
    Long expirationTime;

    // public Object map(Object object) {
    //     throw new UnsupportedOperationException("Unimplemented method 'map'");
    // }
}
