package org.example.hospital.repository;

import org.example.hospital.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;


public interface PatientRepository extends JpaRepository<Patient, Long> {

}
