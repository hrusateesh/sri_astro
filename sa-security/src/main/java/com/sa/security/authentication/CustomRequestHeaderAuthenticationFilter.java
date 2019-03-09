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
