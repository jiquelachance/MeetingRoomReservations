package com.websystique.springmvc.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="RESERVATION")
public class Reservation implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_id", nullable = false)
	private Integer id;
	
	@ManyToOne(targetEntity = User.class)
	@JsonBackReference
	private User user;
	//@JoinColumn(name="id")
	
	@NotNull
	//@DateTimeFormat(pattern="yyyy-MM-dd HH") 
	@Column(name = "reservation_date", nullable = false)
	//@Column(name = "reservation_date", nullable = false, columnDefinition = "DATETIME")
	//@Type(type="org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
	private String reservation_date;

	@Size(min=2, max=40)
	//@Column(name = "DESCRIPTION", nullable = false)
	@Column(name = "description", nullable = false)
	private String description;

	public Reservation(){
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getReservation_date() {
		return reservation_date;
	}

	public void setReservation_date(String reservation_date) {
		this.reservation_date = reservation_date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((reservation_date == null) ? 0 : reservation_date.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Reservation other = (Reservation) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (reservation_date == null) {
			if (other.reservation_date != null)
				return false;
		} else if (!reservation_date.equals(other.reservation_date))
			return false;
		return true;
	}
	
}
