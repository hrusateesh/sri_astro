package com.sa.security.authorization.impl;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.sa.security.authorization.ISecurityAuthorization;
import com.sa.security.authorization.SecurityAuthorizationContext;

/**
 * The <code>UserVerificationImpl</code> verifies whether the given user exists in our system.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Qualifier("userverificatons")
@Component
public class UserVerificationImpl extends UserVerification implements ISecurityAuthorization {

	@Override
	public boolean authorize(SecurityAuthorizationContext context) {
		boolean isAuthorized = true;
		String userId = getUserId(context.getRequest());
		String unauthPage = "db";
		if ("Sateesh1".equals(userId)) {
			HttpSession session = context.getSession();
			getUserComposite(context.getRequest(), session);
			context.setUserId(userId);
			context.addErrors("The user is not valid");
			context.setRedirectPage(unauthPage);
			isAuthorized = false;
		}
		// Check user exists in our system.
		// Check user is active.
		return isAuthorized;
	}

}
