package com.websystique.springmvc.dao;

import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.Reservation;
import com.websystique.springmvc.model.User;

import java.io.Serializable;

import java.lang.reflect.ParameterizedType;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

@Repository("reservationDaoImplementation")
public class ReservationDaoImplementation implements Serializable, ReservationDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	protected Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	public Set<Reservation> findAllReservations() {
		Session session = getSession();
		String hql = "from Reservation";
		Query query = session.createQuery(hql);
		HashSet<Reservation> reservations = new HashSet<Reservation>();
		reservations.addAll(query.list());
		//session.close();
		return reservations;		
	}

	public Set<Reservation> findReservationsByUser(Integer user_id) {
		return findUserById(user_id).getReservations();
	}
	
	public void add_reservation(Integer user_id, Reservation r) {
	  	  User u = findUserById(user_id);
	  	  r.setUser(u);
	  	  /*
	  	  HashSet<Reservation> user_reservations = new HashSet<Reservation>();
	  	  user_reservations.addAll(u.getReservations());
	  	  user_reservations.add(r);
	  	  getSession().persist(u);		
	  	  */
		  getSession().persist(r);
	}

	public User findUserById(Integer user_id) {
		Session session = getSession();
		User u = (User) session.get(User.class, user_id);
		return u;
	}

	public void delete_reservation(Integer reservation_id) {
		getSession().delete(findReservationById(reservation_id));	
	}

	public Reservation findReservationById(Integer reservation_id) {
		Session session = getSession();
		Reservation r = (Reservation) session.get(Reservation.class, reservation_id);
		return r;
	}

	public Integer findUserIdByUsername(String username) {
		for(User u : findAllUsers()){
			if(u.getUsername().equals(username))
				return u.getId();
		}
		return null;
	}

	public Set<User> findAllUsers(){
		Session session = getSession();
		String hql = "from User";
		Query query = session.createQuery(hql);
		HashSet<User> users = new HashSet<User>();
		users.addAll(query.list());
		//session.close();
		return users;	
	}
	
	
}
