package com.websystique.springmvc.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.websystique.springmvc.model.User;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	public User findById(Integer id) {
		return getByKey(id);
	}
	
	public void saveUser(User user) {
		  getSession().persist(user);
	}

	public void updateUser(User user) {
		getSession().update(user);
	}

	public void deleteUserById(Integer id) {
		getSession().delete(findById(id));			
	}

	public List<User> findAllUsers() {
		Session session = getSession();
		String hql = "from User";
		Query query = session.createQuery(hql);
		List<User> users = new ArrayList<User>();
		users.addAll(query.list());
		//session.close();
		return users;	
	}

	public void deleteAllUsers() {
		List<User> all_users = new ArrayList<User>(findAllUsers());
		for(User u : all_users){
			getSession().delete(u);
		}
	}

	public boolean isUserExist(User user) {
		boolean exist = false;
		List<User> all_users = new ArrayList<User>(findAllUsers());
		for(User u : all_users){
			if(u.getId().equals(u.getId())){
				exist = true;
				break;
			}
		}
		return false;
	}

	public User findByUsername(String name) {
		List<User> all_users = new ArrayList<User>(findAllUsers());
		for(User u : all_users){
			if(u.getUsername().equals(name)){
				return u;
			}
		}
		return null;
	}
	
}
