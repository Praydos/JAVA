package org.example.hospital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Entity
@Data @Builder
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date date;
    private boolean malade;
    private int score;

    public Patient(Long id,String name, Date date, boolean malade, int score) {
        this.name = name;
        this.date = date;
        this.malade = malade;
        this.score = score;
        this.id = id;
    }

    public Patient() {}


    public Long getId() { return id; }
    public String getName() { return name; }
    public Date getDate() { return date; }
    public boolean isMalade() { return malade; }
    public int getScore() { return score; }


}
