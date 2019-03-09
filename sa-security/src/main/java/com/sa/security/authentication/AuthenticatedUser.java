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

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sa.security.UserComposite;

/**
 * The <code>AuthenticatedUser</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class AuthenticatedUser implements UserDetails {

	private static final long serialVersionUID = -8621536360380588881L;
	private final UserComposite userComposite;
	private final Set<GrantedAuthority> grantedAuthorities = new HashSet<>();

	public AuthenticatedUser(UserComposite userComposite) {
		this.userComposite = userComposite;
		initAuthorities();
	}

	private void initAuthorities() {
		// set granted authorities
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return grantedAuthorities;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return userComposite.getUser().getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return userComposite.getUser().isEnabled();
	}

}
