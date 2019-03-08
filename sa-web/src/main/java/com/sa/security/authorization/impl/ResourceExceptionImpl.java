package com.sa.security.authorization.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.sa.security.authorization.ISecurityAuthorization;
import com.sa.security.authorization.SecurityAuthorizationContext;

/**
 * The <code>ResourceExceptionImpl</code> excludes the verrification and aloow the page to be rendered.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class ResourceExceptionImpl extends UserVerification implements ISecurityAuthorization {

	@Override
	public boolean authorize(SecurityAuthorizationContext context) {
		String resourceName = StringUtils.remove(getResourceName(context.getRequest()), "/");
		context.setRequestedResourceName(resourceName);
		return getResourceExclusion().containsKey(resourceName);
	}

}
