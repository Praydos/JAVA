package com.example.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String email;
    private String domain;
    private String username;


    public Entreprise() {}

    public Entreprise(Long id, String nom, String email, String domain, String username) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.domain = domain;
        this.username = username;

    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getEmail() {
        return email;
    }

    public String getDomain() {
        return domain;
    }

    public String getUsername() {
        return username;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
