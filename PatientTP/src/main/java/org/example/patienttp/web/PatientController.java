package org.example.patienttp.web;

import org.example.patienttp.entities.Patient;
import org.example.patienttp.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    // fetch all the patients
    @GetMapping("/index")
    public String index(Model model,
                        @RequestParam(name= "page" ,defaultValue = "0") int page,// pagination
                        @RequestParam(name="size", defaultValue = "5") int size,
                        @RequestParam(name="keyword",defaultValue = "") String keyword) {
        Page<Patient> Pagepatients = patientRepository.findByFirstNameContainingIgnoreCase(keyword,PageRequest.of(page,size)); //get all patient
        // stock in model
        model.addAttribute("ListPatients",Pagepatients.getContent()); // paients
        model.addAttribute("pages",new int[Pagepatients.getTotalPages()]); // pages
        model.addAttribute("currentPage",page);
        model.addAttribute("keyword",keyword);
        return "patients";
    }


    //delete a user based on id
    @GetMapping("deletePatient")
    public String delet(@RequestParam(name = "id") Long id) {
        patientRepository.deleteById(id);
        return "redirect:/index";
    }

    @GetMapping("/new")
    public String showPatientForm(Model model) {
        model.addAttribute("patient", new Patient());
        return "patientform"; // Thymeleaf or JSP page
    }

    @PostMapping("/save")
    public String savePatient(@ModelAttribute("patient") Patient patient, BindingResult result) {
        if (result.hasErrors()) {
            // Log errors or handle them appropriately
            return "patientform";
        }
        System.out.println("Saving patient: " + patient.getFirstName() + " " + patient.getLastName());
        patientRepository.save(patient);
        return "redirect:/index"; // Redirect to the list after saving
    }


}
