package com.example.demo.repository;

import com.example.demo.entities.Entreprise;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
    Page<Entreprise> findByNomContainingIgnoreCase(String keyword, Pageable pageable);
}
