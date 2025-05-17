package com.example.demo.web;

import com.example.demo.entities.Entreprise;
import com.example.demo.repository.EntrepriseRepository;
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

@Controller
public class EntrpriseController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    // fetch all the Entreprise
    @GetMapping("/index")
    public String index(Model model,
                        @RequestParam(name= "page" ,defaultValue = "0") int page,// pagination
                        @RequestParam(name="size", defaultValue = "5") int size,
                        @RequestParam(name="keyword",defaultValue = "") String keyword) {
        Page<Entreprise> Pageenterprises = entrepriseRepository.findByNomContainingIgnoreCase(keyword, PageRequest.of(page,size)); //get all patient
        // stock in model
        model.addAttribute("ListEntreprises",Pageenterprises.getContent()); // paients
        model.addAttribute("pages",new int[Pageenterprises.getTotalPages()]); // pages
        model.addAttribute("currentPage",page);
        model.addAttribute("keyword",keyword);
        return "enterprise";
    }

    //delete
    @GetMapping("deleteEnterprise")
    public String delet(@RequestParam(name = "id") Long id) {
        entrepriseRepository.deleteById(id);
        return "redirect:/index";
    }

    @GetMapping("/newEnterprise")
    public String showEnterpriseForm(Model model) {
        model.addAttribute("enterprise", new Entreprise());
        return "entrepriseform"; // Thymeleaf or JSP page
    }

    // adding new Enterprises
    @PostMapping("/saveEnterprise")
    public String saveEnterprise(@ModelAttribute("enterprise") Entreprise entreprise, BindingResult result) {
        if (result.hasErrors()) {
            // Log errors or handle them appropriately
            return "entrepriseform";
        }
        System.out.println("Saving enterprise: " + entreprise.getNom() + " " + entreprise.getEmail());
        entrepriseRepository.save(entreprise);
        return "redirect:/newEnterprise"; // Redirect to the list after saving
    }



}
