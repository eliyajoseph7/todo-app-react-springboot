package com.todoapplication.todo.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "todos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Todo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    private String description;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }
}
