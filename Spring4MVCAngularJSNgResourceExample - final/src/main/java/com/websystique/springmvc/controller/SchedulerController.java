package com.websystique.springmvc.controller;


import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.websystique.springmvc.model.Reservation;
import com.websystique.springmvc.model.User;
import com.websystique.springmvc.service.SchedulerService;

@RestController
public class SchedulerController {

	@Autowired
	SchedulerService service;
	
	@Autowired
	MessageSource messageSource;
	
	// I must not return a view, but data because it is REST
    
    //GET ALL RESERVATIONS
	@RequestMapping(value={"/reservation"}, method=RequestMethod.GET) //url is independent of the views, it corresponds to the AJAX call of the client , so it can be whatever I want
	public ResponseEntity<Set<Reservation>> listAllReservations() { //i return all, but I could filte the URL and take @PathVariable Integer year, @PathVariable Integer month, @PathVariable Integer day 
		Set<Reservation> reservations = service.findAllReservations();
        if(reservations.isEmpty()){
            return new ResponseEntity<Set<Reservation>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<Set<Reservation>>(reservations, HttpStatus.OK);
    }	
       
	//CREATE NEW RESERVATION
	@RequestMapping(value = "/reservation", method = RequestMethod.POST)
    public ResponseEntity<Void> createReservation(@RequestBody Reservation reservation,    UriComponentsBuilder ucBuilder) {
        System.out.println("Creating reservation");
        Integer id = findIdFromSession();
        service.add_reservation(id, reservation);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/reservation/{id}").buildAndExpand(reservation.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    } 

    //GET A RESERVATION
    @RequestMapping(value = "/reservation/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reservation> getUser(@PathVariable("id") Integer id) {
        System.out.println("Fetching Reservation with id " + id);
        Reservation reservation = service.findReservationById(id);
        if (reservation == null) {
            System.out.println("Reservation with id " + id + " not found");
            return new ResponseEntity<Reservation>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Reservation>(reservation, HttpStatus.OK);
    }
 
    
    //DELETE A RESERVATION
	@RequestMapping(value = "/reservation/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Reservation> deleteReservation(@PathVariable("id") int id) {
        System.out.println("Fetching & Deleting Reservation with id " + id);
        Reservation reservation = service.findReservationById(id);
        if (reservation == null) {
            System.out.println("Unable to delete. Reservation with id " + id + " not found");
            return new ResponseEntity<Reservation>(HttpStatus.NOT_FOUND);
        }
        service.delete_reservation(id);
        return new ResponseEntity<Reservation>(HttpStatus.NO_CONTENT);
    }
    
    @RequestMapping(value = "/agenda", method = RequestMethod.GET)
    public ResponseEntity<Set<Reservation>> listReservationsByUser() {
        Integer id = findIdFromSession();
        System.out.println("Fetching Reservations of user " + id);
        Set<Reservation> reservations = service.findReservationsByUser(id);
        System.out.println("SIZE " + reservations.size());
        return new ResponseEntity<Set<Reservation>>(reservations, HttpStatus.OK);
    }
    
    private Integer findIdFromSession() {
		//return 1;
    	return service.findUserIdByUsername(getPrincipal());
	}
    
	private String getPrincipal(){ //it returns the username
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if (principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}
}
