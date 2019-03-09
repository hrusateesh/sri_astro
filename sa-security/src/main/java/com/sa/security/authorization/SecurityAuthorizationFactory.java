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
