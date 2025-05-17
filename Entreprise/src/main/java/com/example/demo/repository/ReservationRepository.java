package com.example.demo.repository;

import com.example.demo.entities.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Page<Reservation> findByReservationStatusContainsIgnoreCase(String keyword, Pageable pageable);

}
