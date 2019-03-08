package com.sa.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sa.dao.pojo.User;
import com.sa.dao.repository.UserRepository;
import com.sa.web.pojo.ReturnObject;
import com.sa.web.pojo.UserUIComposite;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping(value = "/currentUser", produces = "application/json")
	public ReturnObject getDetails(Authentication authentication) {
		ReturnObject retVal = new ReturnObject();
		if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
			UserDetails principal = (UserDetails) authentication.getPrincipal();
			User user = userRepository.findByEmail(principal.getUsername());
			retVal.setResult(UserUIComposite.fromUser(user));
		} else {
			retVal.setResult("anonymousUser");
		}
		return retVal;
	}

}
