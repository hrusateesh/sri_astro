package com.sa.security.authentication;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import com.sa.web.pojo.UserComposite;

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
		String userId = pricipal.toString();

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
