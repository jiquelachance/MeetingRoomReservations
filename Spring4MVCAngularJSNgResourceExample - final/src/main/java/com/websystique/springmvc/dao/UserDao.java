package com.websystique.springmvc.dao;

import java.util.List;

import com.websystique.springmvc.model.User;

public interface UserDao {

	User findById(Integer id);
	
	User findByUsername(String string);
	
	void saveUser(User user);
	
	void updateUser(User user);
	
	void deleteUserById(Integer id);

	List<User> findAllUsers(); 
	
	void deleteAllUsers();
	
	public boolean isUserExist(User user);
}

