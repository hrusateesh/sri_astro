package com.sa.security.authorization;

/**
 * The <code>ISecurityAuthorization</code> defines the contract.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public interface ISecurityAuthorization {

	/**
	 * contract
	 * 
	 * @param context
	 * @return boolean
	 */
	boolean authorize(SecurityAuthorizationContext context);
}
