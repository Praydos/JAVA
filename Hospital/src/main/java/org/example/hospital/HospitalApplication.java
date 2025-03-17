package org.example.hospital;

import org.example.hospital.entities.Patient;
import org.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class HospitalApplication implements CommandLineRunner {

	@Autowired
	private PatientRepository patientRepository;

	public static void main(String[] args) {
		SpringApplication.run(HospitalApplication.class, args);

	}


	@Override
	public void run(String... args) throws Exception {
		patientRepository.save(new Patient(null,"mohamed",new Date(),false,34));
		patientRepository.save(new Patient(null,"hanane",new Date(),false,3040));
		patientRepository.save(new Patient(null,"Imane",new Date(),true,340));



	}
}
