package com.sa.security.authorization;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 * The <code>SecurityAuthorizationFactory</code> returns the individual implementations.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class SecurityAuthorizationFactory {

	@Qualifier("userverificatons")
	@Autowired
	private List<ISecurityAuthorization> securityAuthorizations;

	@Autowired
	private ISecurityAuthorization resourceExceptionImpl;

	public List<ISecurityAuthorization> getSecurityAuthorizations() {
		return securityAuthorizations;
	}

	public void setSecurityAuthorizations(List<ISecurityAuthorization> securityAuthorizations) {
		this.securityAuthorizations = securityAuthorizations;
	}

	public ISecurityAuthorization getResourceExceptionImpl() {
		return resourceExceptionImpl;
	}

	public void setResourceExceptionImpl(ISecurityAuthorization resourceExceptionImpl) {
		this.resourceExceptionImpl = resourceExceptionImpl;
	}

}
