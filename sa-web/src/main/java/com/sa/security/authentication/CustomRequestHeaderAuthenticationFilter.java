package com.sa.security.authentication;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.preauth.PreAuthenticatedCredentialsNotFoundException;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

/**
 * The <code>CustomRequestHeaderAuthenticationFilter</code> is wrapper to spring security
 * RequestHeaderAuthenticationFilter so that we can override the behavior when running locally to not require a header
 * attribute.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class CustomRequestHeaderAuthenticationFilter extends RequestHeaderAuthenticationFilter {

	private String pricipalRequestHeader = "SM_USER";

	@Override
	protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
		String principal = request.getHeader(pricipalRequestHeader);

		if (principal == null) {
			principal = System.getProperty("user.name");
			// add logging
		}

		if (principal == null) {
			throw new PreAuthenticatedCredentialsNotFoundException(
					pricipalRequestHeader + " header not found in request.");
		}
		return principal;
	}
}
