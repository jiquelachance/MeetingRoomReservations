package com.websystique.springmvc.service;

import java.text.SimpleDateFormat;

import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.ReservationDaoImplementation;
import com.websystique.springmvc.model.Reservation;
import com.websystique.springmvc.model.User;


@Service("schedulerServiceImplementation")
@Transactional
public class SchedulerServiceImplementation implements SchedulerService {

	@Autowired
	private ReservationDaoImplementation reservation_dao;
	
	public Set<Reservation> findAllReservations() {
		return reservation_dao.findAllReservations();
	}
	
	@PreAuthorize("hasRole('USER')") 
	public Set<Reservation> findReservationsByUser(Integer user_id) {
		return reservation_dao.findReservationsByUser(user_id);
	}
	@PreAuthorize("hasRole('USER')") 
	public void add_reservation(Integer user_id, Reservation r) {
		reservation_dao.add_reservation(user_id, r);
	}
	@PreAuthorize("hasRole('USER')") 
	public void delete_reservation(Integer reservation_id) {
		reservation_dao.delete_reservation(reservation_id);
	}
	public Set<Reservation> findReservationsByWeek(int year, int month, int day) {
		HashSet<Reservation> all_reservations = new HashSet<Reservation>();
		all_reservations.addAll(reservation_dao.findAllReservations());
		return reservations_filter(all_reservations, year, month, day);
	}
	private Set<Reservation> reservations_filter(HashSet<Reservation> all_reservations, int year, int month, int day) {
		//first of all find the start and the end date of the relative week
	    // set the date
	    Calendar cal = Calendar.getInstance();
	    cal.set(year, month - 1, day); //month -1?

	    // "calculate" the start date of the week
	    Calendar first = (Calendar) cal.clone();
	    first.add(Calendar.DAY_OF_WEEK, 
	              first.getFirstDayOfWeek() - first.get(Calendar.DAY_OF_WEEK));
	    // and add six days to the end date
	    Calendar last = (Calendar) first.clone();
	    last.add(Calendar.DAY_OF_YEAR, 6);

	    // print the result
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	    System.out.println(df.format(first.getTime()) + " -> " + 
	                       df.format(last.getTime()));

		HashSet<Reservation> filtered_reservations = new HashSet<Reservation>();
		for(Reservation r : all_reservations){
			Date d = java.sql.Date.valueOf(r.getReservation_date().toString());
	    	if(isWithinRange(
	    			//Date.from(r.getReservation_date().atStartOfDay(ZoneId.systemDefault()).toInstant()), 
	    			d,
	    			first.getTime(), last.getTime())){
	    		filtered_reservations.add(r);
	    	}
	    }
	    
	    return filtered_reservations;
	    
	}
	public boolean isWithinRange(Date testDate, Date startDate, Date endDate) {
	    return testDate.getTime() >= startDate.getTime() &&
	             testDate.getTime() <= endDate.getTime();
	}
	public User findUserById(Integer id) {
		return reservation_dao.findUserById(id);
	}
	public Integer findUserIdByUsername(String username) {
		return reservation_dao.findUserIdByUsername(username); 
	}

	public Reservation findReservationById(Integer id) {
		return reservation_dao.findReservationById(id); 
	}
	
	/*
	public Person findPersonById(Integer id) {
		return person_dao.findPersonById(id);
	}
	public Event findEventById(Integer id) {
		return event_dao.findEventById(id);
	}

	public void savePerson(Person person) {
		person_dao.savePerson(person);
	}
	public void saveEvent(Event event) {
		event_dao.saveEvent(event);
	}
	
	/*
	 * Since the method is running with Transaction, No need to call hibernate update explicitly.
	 * Just fetch the entity from db and update it with proper values within transaction.
	 * It will be updated in db once transaction ends. 

	public void deletePersonById(Integer Id) {
		person_dao.deletePersonById(Id);
	}
	public void deleteEventById(Integer Id) {
		event_dao.deleteEventById(Id);
	}
	
	public List<Person> findAllPeople() {
		return person_dao.findAllPeople();
	}
	public List<Event> findAllEvents() {
		return event_dao.findAllEvents();
	}
	*/
	
}
