package com.example.demo.entities;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
public class Reservation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime reservationDate;
    private String typeReservation;
    private String reservationStatus;
    private String cout;

    public Reservation() {}

    public Reservation(Long id, LocalDateTime reservationDate, String typeReservation, String reservationStatus, String cout) {
        this.id = id;
        this.reservationDate = reservationDate;
        this.typeReservation = typeReservation;
        this.reservationStatus = reservationStatus;
        this.cout = cout;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public String getTypeReservation() {
        return typeReservation;
    }

    public String getCout() {
        return cout;
    }

    public String getReservationStatus() {
        return reservationStatus;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public void setTypeReservation(String typeReservation) {
        this.typeReservation = typeReservation;
    }

    public void setReservationStatus(String reservationStatus) {
        this.reservationStatus = reservationStatus;
    }

    public void setCout(String cout) {
        this.cout = cout;
    }
}