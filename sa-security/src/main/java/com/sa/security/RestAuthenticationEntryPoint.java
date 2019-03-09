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
package com.sa.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * The <code>RestAuthenticationEntryPoint</code> is for send response when secure resource is accessed with out
 * authentication.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest req, HttpServletResponse resp, AuthenticationException ex)
			throws IOException, ServletException {
		resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
	}

}
