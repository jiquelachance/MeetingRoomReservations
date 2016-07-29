package com.websystique.springmvc.service;

import java.util.List;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import com.websystique.springmvc.model.User;



public interface UserService {
	
	List<User> findAllUsers();
	
	void saveUser(User user);
	
	void deleteAllUsers();
	
	public boolean isUserExist(User user);
	
	//@PostAuthorize ("returnObject.type == authentication.name")
	User findById(Integer id);
	
	//@PreAuthorize("hasRole('ADMIN')")
	void updateUser(User user);
	
	//@PreAuthorize("hasRole('ADMIN') AND hasRole('DBA')")
	void deleteUserById(Integer id);

	User findByUsername(String username);
	
}
