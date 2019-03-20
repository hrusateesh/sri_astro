/*******************************************************************************
 * Copyright 2019 Sateesh Gampala
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License.  You may obtain a copy
 * of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * Contributors:
 * 	Sateesh Gampala - Initial contribution and API
 ******************************************************************************/
package com.sa.web.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sa.dao.entity.Role;
import com.sa.dao.entity.User;
import com.sa.dao.repository.UserRepository;
import com.sa.web.pojo.ReturnObject;

/**
 * The <code>UserController</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@RestController
@RequestMapping("/rest/user")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@GetMapping(value = "/all", produces = "application/json")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@PostMapping(value = "/save")
	public ReturnObject save(@Valid @RequestBody User user, BindingResult bindingResult) {
		ReturnObject retVal = new ReturnObject();
		boolean isValid = true;
		if (user == null || bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream().map(err -> {
				if (err instanceof FieldError) {
					return ((FieldError) err).getField() + " " + err.getDefaultMessage();
				} else {
					return err.getDefaultMessage();
				}
			}).collect(Collectors.toList());
			retVal.addObject("errors", errors);
			retVal.setErrorMessage("Invalid user object");
			isValid = false;
		}
		User existUser = userRepository.findByEmail(user.getEmail());
		if(existUser == null) {
			retVal.setErrorMessage("User does not exist");
			isValid = false;
		}
		
		if (isValid) {
			userRepository.save(user);
		}
		return retVal;
	}
	
	@PostMapping(value = "/deactive")
	public ReturnObject deactive() {
		ReturnObject retVal = new ReturnObject();
		return retVal;
	}
	
	@PostMapping(value = "/delete")
	public ReturnObject delete() {
		ReturnObject retVal = new ReturnObject();
		return retVal;
	}

}
