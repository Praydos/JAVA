package org.example.hospital.web;


import lombok.AllArgsConstructor;
import org.example.hospital.entities.Patient;
import org.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PatientController {
    private final PatientRepository patientRepository;
    public PatientController ( PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
    @GetMapping("/index")
    public String index(Model model) {
        List<Patient> listPatients = patientRepository.findAll();
        model.addAttribute("listPatients", listPatients);
        return "Patients";
    }
}
