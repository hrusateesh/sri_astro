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

import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.WebAuthenticationDetails;

/**
 * The <code>SiteminderAuthenticationDetails</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class SiteminderAuthenticationDetails extends WebAuthenticationDetails {

	private static final long serialVersionUID = -2870278326355965583L;
	public static final String REQ_SERVLET_PATH_HEADER_KEY = "requestservletpath";
	private final Map<String, String> headerDetails;

	public SiteminderAuthenticationDetails(HttpServletRequest request) {
		super(request);
		headerDetails = new HashMap<>();
		Enumeration<String> headerNames = request.getHeaderNames();
		while (headerNames.hasMoreElements()) {
			String name = headerNames.nextElement().toString();
			headerDetails.put(name.toLowerCase(), request.getHeader(name));
		}

		if (request.getServletPath() != null) {
			headerDetails.put(REQ_SERVLET_PATH_HEADER_KEY, request.getServletPath());
		}
	}

	/**
	 * @return an unmodifable map containing the headers injected by the Siteminder plugin containing further
	 *         information about the user
	 */
	public Map<String, String> readHeaderDetails() {
		return Collections.unmodifiableMap(headerDetails);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		return prime * super.hashCode() + ((headerDetails == null) ? 0 : headerDetails.hashCode());
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}

		if (!super.equals(obj)) {
			return false;
		}

		if (getClass() != obj.getClass()) {
			return false;
		}

		SiteminderAuthenticationDetails other = (SiteminderAuthenticationDetails) obj;
		if (headerDetails == null) {
			if (other.headerDetails != null) {
				return false;
			}
		} else if (!headerDetails.equals(other.headerDetails)) {
			return false;
		}
		return true;
	}
}
