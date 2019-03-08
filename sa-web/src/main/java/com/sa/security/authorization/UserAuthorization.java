package com.sa.security.authorization;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sa.security.authorization.impl.ResourceExceptionImpl;

/**
 * The <code>UserAuthorization</code> verifies whether the given user is eligible to request a resource.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class UserAuthorization {

	private static Logger logger = LoggerFactory.getLogger(UserAuthorization.class);

	@Autowired
	private SecurityAuthorizationFactory securityAuthorizationFactory;

	/**
	 * @param request
	 * @return
	 */
	public SecurityAuthorizationContext authorizeUser(HttpServletRequest request) {
		SecurityAuthorizationContext context = new SecurityAuthorizationContext();
		context.setRequest(request);
		context.setSession(request.getSession());
		boolean isExempted = securityAuthorizationFactory.getResourceExceptionImpl().authorize(context);
		if (isExempted) {
			// This resource is excluded for the validation, no need to apply rest of rules.
			return context;
		}
		applySecurityRules(context);
		return context;
	}

	/**
	 * @param context
	 */
	private void applySecurityRules(SecurityAuthorizationContext context) {
		for (ISecurityAuthorization authorization : securityAuthorizationFactory.getSecurityAuthorizations()) {
			if (authorization instanceof ResourceExceptionImpl)
				continue;
			boolean isAuthorized = authorization.authorize(context);
			if (!isAuthorized) {
				if (context.getErrors() != null && !context.getErrors().isEmpty()) {
					context.getErrors().forEach(err -> logger.info("User Authorization failed as: " + err));
				}
				return;
			}
		}
	}
}
