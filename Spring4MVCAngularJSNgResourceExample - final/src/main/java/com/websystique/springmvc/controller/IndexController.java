package com.websystique.springmvc.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.websystique.springmvc.model.User;
import com.websystique.springmvc.service.UserService;

@Controller
@RequestMapping("/")
public class IndexController {
	
	@Autowired
	UserService service;
	
	@RequestMapping(method = RequestMethod.GET)
	public String getIndexPage() {
	  return "scheduler";
	}
	
	@RequestMapping(value = "/registration", method = RequestMethod.GET)
	public String showRegistrationForm(WebRequest request, Model model) {
	    User user = new User();
	    model.addAttribute("user", user);
	    return "registration";
	}
	
	@RequestMapping(value = "/registration", method = RequestMethod.POST)
	public String registerUserAccount(@ModelAttribute("user") @Valid User user, 
	  BindingResult result, WebRequest request, Errors errors) {
	    User registered = new User();
	    if (!result.hasErrors() && (user.getType().equals("USER")||user.getType().equals("DBA")||user.getType().equals("ADMIN"))) {
	    	try{
	    	service.saveUser(user);
	    	}
	    	catch(Exception E){
	    	    return "redirect:/registration";
	    	}
		    return "login";
	    }
	    
	    return "redirect:/registration";
	}
	
    @RequestMapping(value = {"/users" }, method = RequestMethod.GET)
    public String listAllUsers(ModelMap model) {
 
        List<User> users = service.findAllUsers();
        model.addAttribute("users", users);
        return "users";
    }
	
    @RequestMapping(value = { "/edit-user-{id}" }, method = RequestMethod.GET)
    public String editUser(@PathVariable int id, ModelMap model) {
        User user  = service.findById(id);
        model.addAttribute("user", user);
        model.addAttribute("edit", true);
        return "update_user";
    }
    
    @RequestMapping(value = { "/edit-user-{id}" }, method = RequestMethod.POST)
    public String updateUser(User user, ModelMap model, @PathVariable int id) {
        service.updateUser(user);
        model.addAttribute("success", "User " + user.getUsername()  + " updated successfully");
        return "update_user_success";
    }
    
    @RequestMapping(value = { "/delete-user-{id}" }, method = RequestMethod.GET)
    public String deleteUser(@PathVariable int id) {
        service.deleteUserById(id);
        return "redirect:/#/users";
    }
    
	@RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
	public String accessDeniedPage(ModelMap model) {
		model.addAttribute("user", getPrincipal());
		return "access_denied";
	}

	@RequestMapping(value = "/Access_Denied", method = RequestMethod.POST)
	public String accessDeniedPage_post(ModelMap model) {
		model.addAttribute("user", "Anonymous");
		return "access_denied";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage() {
		return "login";
	}

	@RequestMapping(value="/logout", method = RequestMethod.GET)
	public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null){    
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/login?logout";
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