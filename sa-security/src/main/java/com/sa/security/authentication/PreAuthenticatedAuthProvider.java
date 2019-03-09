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
package com.sa.security.authentication;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import com.sa.security.UserComposite;

/**
 * The <code>PreAuthenticatedAuthProvider</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
// @Component
public class PreAuthenticatedAuthProvider implements AuthenticationProvider {

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Object pricipal = authentication.getPrincipal();

		if (pricipal == null) {
			return null;
		}
		//		String userId = pricipal.toString();

		// get user info
		// if null return null
		// setlastlogin as now and update
		UserComposite userComposite = new UserComposite();
		AuthenticatedUser authUser = new AuthenticatedUser(userComposite);
		PreAuthenticatedAuthenticationToken token = new PreAuthenticatedAuthenticationToken(authUser,
				authentication.getCredentials(), authUser.getAuthorities());
		token.setDetails(authentication.getDetails());
		return token;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return PreAuthenticatedAuthenticationToken.class.isAssignableFrom(authentication);
	}

}
