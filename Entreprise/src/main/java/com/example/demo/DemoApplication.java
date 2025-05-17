package com.example.demo;

import com.example.demo.entities.Entreprise;
import com.example.demo.repository.EntrepriseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(EntrepriseRepository entrepriseRepository) {
        return args -> {
            entrepriseRepository.save(new Entreprise(null,"anas","email","domain","username"));
            entrepriseRepository.save(new Entreprise(null,"dadas","Demail","Ddomain","Dusername"));

            List<Entreprise> entreprises = entrepriseRepository.findAll();
            for (Entreprise entreprise : entreprises) {
                System.out.println("Nom "+entreprise.getNom()+" domain" +entreprise.getDomain());
            }
        };
    }

}
