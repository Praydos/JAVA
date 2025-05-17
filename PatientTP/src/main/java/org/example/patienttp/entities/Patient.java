package org.example.patienttp.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Builder
@Entity
@Table(name = "PATIENTS")
public class Patient {
    //id
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) // identify the id and autoincrament
    private Long id;
    // attributes
    private String firstName;
    private String lastName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;
    private int score;
    private boolean malade;

    public Patient(){}


        public Patient(  Long id,String firstName, String lastName,Date birthDate, int score, boolean malade) {
             this.birthDate = birthDate;
              this.score = score;
              this.malade = malade;
              this.id = id;
              this.firstName = firstName;
             this.lastName = lastName;
         }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public int getScore() {
        return score;
    }

    public boolean isMalade() {
        return malade;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setMalade(boolean malade) {
        this.malade = malade;
    }
}
