package com.sa.security.authentication;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.stereotype.Component;

/**
 * The <code>SiteminderAuthenticationDetailsSource</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class SiteminderAuthenticationDetailsSource
		implements AuthenticationDetailsSource<HttpServletRequest, SiteminderAuthenticationDetails> {

	@Override
	public SiteminderAuthenticationDetails buildDetails(HttpServletRequest context) {
		return new SiteminderAuthenticationDetails(context);
	}

}
