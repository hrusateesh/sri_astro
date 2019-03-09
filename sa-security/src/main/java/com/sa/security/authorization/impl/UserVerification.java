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

import static com.sa.security.authorization.SecurityConstants.ENVIRONMENT;
import static com.sa.security.authorization.SecurityConstants.ENVIRONMENT_LOCAL;
import static com.sa.security.authorization.SecurityConstants.HTTP_UID;
import static com.sa.security.authorization.SecurityConstants.USER_INFO;
import static org.apache.commons.lang3.StringUtils.equalsIgnoreCase;
import static org.apache.commons.lang3.StringUtils.isEmpty;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.sa.security.UserComposite;
import com.sa.security.authorization.SecurityConstants;
import com.sa.security.authorization.SecurityConstants.ExclusionPages;

/**
 * The <code>UserVerification</code> defines all of the common function
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class UserVerification {

	private static Logger logger = LoggerFactory.getLogger(UserVerification.class);

	private static final String SLASH = "/";

	protected Map<String, String> getResourceExclusion() {
		Map<String, String> resExclusions = new HashMap<>();
		for (ExclusionPages page : SecurityConstants.ExclusionPages.values()) {
			resExclusions.put(page.getDescription(), page.getDescription());
		}
		return resExclusions;
	}

	protected String getResourceName(HttpServletRequest request) {
		String resourceName = "";
		if (!isEmpty(request.getServletPath())) {
			resourceName = extractResourceName(request.getServletPath());
		} else {
			resourceName = request.getPathInfo();
		}
		return resourceName;
	}

	public UserComposite getUserComposite(HttpServletRequest request, HttpSession session) {
		String userId = getUserId(request);
		if (isEmpty(userId)) {
			logger.info("The user id is empty");
			return null;
		}
		// Read the user info from the HttpSession
		UserComposite user = (UserComposite) session.getAttribute(USER_INFO);
		if (user == null) {
			user = new UserComposite(); //TODO get user info;
			session.setAttribute(USER_INFO, user);
		} else {
			user = (UserComposite) session.getAttribute(USER_INFO);
		}
		return user;
	}

	public String getUserId(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute(HTTP_UID);
		if (isEmpty(userId)) {
			if (equalsIgnoreCase(System.getProperty(ENVIRONMENT), ENVIRONMENT_LOCAL)) {
				userId = System.getProperty("user.name");
				logger.info("Development mode. Reading system user id: {}", userId);
			} else {
				// TODO read uid from request header.
			}
			session.setAttribute(HTTP_UID, userId);
		}
		return userId;
	}

	private String extractResourceName(String servletPath) {
		if (servletPath == null) {
			return null;
		}
		StringBuffer input = new StringBuffer(servletPath);

		if (input.lastIndexOf(SLASH) == input.length() - 1) {
			input.setCharAt(input.length() - 1, ' ');
		}
		return input.substring(input.lastIndexOf(SLASH) + 1).trim();
	}
}
