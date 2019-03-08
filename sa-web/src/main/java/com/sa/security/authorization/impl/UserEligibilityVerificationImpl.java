package com.sa.security.authorization.impl;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.sa.security.authorization.ISecurityAuthorization;
import com.sa.security.authorization.SecurityAuthorizationContext;

/**
 * The <code>UserEligibilityVerificationImpl</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Qualifier("userverificatons")
@Component
public class UserEligibilityVerificationImpl extends UserVerification implements ISecurityAuthorization {

	@Override
	public boolean authorize(SecurityAuthorizationContext context) {
		boolean isAuthorized = true;
		return isAuthorized;
	}

}
