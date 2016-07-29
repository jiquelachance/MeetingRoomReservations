package com.websystique.springmvc.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.websystique.springmvc.dao.UserDao;
import com.websystique.springmvc.dao.UserDaoImpl;
import com.websystique.springmvc.model.User;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDaoImpl user_dao;

	public List<User> findAllUsers() {
		return user_dao.findAllUsers();
	}
	
	public User findById(Integer id) {
		return user_dao.findById(id);
	}
	
	public User findByUsername(String name) {
		return user_dao.findByUsername(name);
	}
	
	public void saveUser(User user) {
		user_dao.saveUser(user);
	}

	public boolean isUserExist(User user) {
		return user_dao.findByUsername(user.getUsername())!=null;
	}
	
	public void deleteAllUsers(){
		user_dao.deleteAllUsers();
	}
	
	public void deleteUserById(Integer id) {
		user_dao.deleteUserById(id);
	}
	
	public void updateUser(User user) {
		user_dao.updateUser(user);
	}


}
