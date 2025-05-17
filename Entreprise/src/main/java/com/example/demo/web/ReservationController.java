package com.example.demo.web;

import com.example.demo.entities.Reservation;
import com.example.demo.repository.ReservationRepository;
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
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    // fetch all the patients
    @GetMapping("/indexReservation")
    public String index(Model model,
                        @RequestParam(name= "page" ,defaultValue = "0") int page,// pagination
                        @RequestParam(name="size", defaultValue = "5") int size,
                        @RequestParam(name="keyword",defaultValue = "") String keyword) {
        Page<Reservation> Pagepatients = reservationRepository.findByReservationStatusContainsIgnoreCase(keyword, PageRequest.of(page,size)); //get all patient
        // stock in model
        model.addAttribute("ListReservations",Pagepatients.getContent()); // paients
        model.addAttribute("pages",new int[Pagepatients.getTotalPages()]); // pages
        model.addAttribute("currentPage",page);
        model.addAttribute("keyword",keyword);
        return "reservation";
    }



    @GetMapping("deleteReservation")
    public String delet(@RequestParam(name = "id") Long id) {
        reservationRepository.deleteById(id);
        return "redirect:/indexReservation";
    }


    @GetMapping("/newReservation")
    public String showReservationForm(Model model) {
        model.addAttribute("reservation", new Reservation());
        return "reservationForm"; // Thymeleaf or JSP page
    }

    @PostMapping("/saveReservation")
    public String saveReservation(@ModelAttribute("reservation") Reservation reservation, BindingResult result) {
        if (result.hasErrors()) {
            // Log errors or handle them appropriately
            return "reservationForm";
        }
        System.out.println("Saving reservation: " + reservation.getTypeReservation() + " " + reservation.getReservationStatus());
        reservationRepository.save(reservation);
        return "redirect:/newReservation"; // Redirect to the list after saving
    }




}
