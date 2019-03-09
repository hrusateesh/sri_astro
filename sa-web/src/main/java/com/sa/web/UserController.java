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
package com.sa.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sa.dao.entity.User;
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
