package com.websystique.springmvc.service;

import java.util.List;
import java.util.Set;

import com.websystique.springmvc.model.Reservation;
import com.websystique.springmvc.model.User;

public interface SchedulerService {

	public Set<Reservation> findAllReservations();
	public Set<Reservation> findReservationsByWeek(int year, int month, int day);

	public Set<Reservation> findReservationsByUser(Integer user_id);
	public Reservation findReservationById(Integer id);
	
	
	public void add_reservation(Integer user_id, Reservation r);
	public void delete_reservation(Integer reservation_id);
	
	public User findUserById(Integer id);
	public Integer findUserIdByUsername(String username);

}
