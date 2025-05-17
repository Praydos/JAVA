package org.example.patienttp;

import org.example.patienttp.entities.Patient;
import org.example.patienttp.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class PatientTpApplication {

	public static void main(String[] args) {

		SpringApplication.run(PatientTpApplication.class, args);
	}


	@Bean // execute in start
	public CommandLineRunner start(PatientRepository patientRepository) {

		return args -> {
			patientRepository.save(new Patient(null,"anas","dadas",new Date(),30, true));
			patientRepository.save(new Patient(null,"karim","dadas1",new Date(),20, false));


			List<Patient> patients = patientRepository.findAll();
			for (Patient patient : patients) {
				System.out.println(" NOM "+patient.getFirstName() + ", SCORE " + patient.getScore());
			}

        };

	}

}
