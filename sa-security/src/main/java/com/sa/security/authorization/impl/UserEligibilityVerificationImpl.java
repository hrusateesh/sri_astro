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
