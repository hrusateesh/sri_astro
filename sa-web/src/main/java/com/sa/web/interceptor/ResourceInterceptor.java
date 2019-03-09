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
package com.sa.web.interceptor;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.sa.security.authorization.SecurityAuthorizationContext;
import com.sa.security.authorization.UserAuthorization;
import com.sa.security.authorization.impl.UserVerification;

/**
 * The <code>ResourceInterceptor</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class ResourceInterceptor implements HandlerInterceptor {

	private static final Logger logger = LoggerFactory.getLogger(ResourceInterceptor.class);

	@Autowired
	private UserAuthorization userAuthorization;

	@Autowired
	private UserVerification userVerification;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String userId = userVerification.getUserId(request);
		if (userId != null) {
			MDC.put("userid", userId + ":: ");
		}
		SecurityAuthorizationContext context = userAuthorization.authorizeUser(request);
		if (!StringUtils.isEmpty(context.getRedirectPage())) {
			if (context.isLogOut()) {
				response.addHeader("REQUIRES_AUTH", "1");
				forward(request, response, context.getRedirectPage());
			} else {
				redirect(response, context.getRedirectPage());
			}
		}
		logger.info("Verifying " + userId);
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		logger.info("In Post handler");
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		if (ex != null) {
			ex.printStackTrace();
		}
		logger.info("[afterCompletion][" + request.getMethod() + "] - URL: " + request.getRequestURI());
	}

	private void redirect(HttpServletResponse response, String redirectPage) {
		try {
			response.sendRedirect(redirectPage);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void forward(HttpServletRequest request, HttpServletResponse response, String redirectPage) {
		try {
			request.getRequestDispatcher(redirectPage).forward(request, response);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	protected String getParameters(HttpServletRequest request) {
		StringBuffer posted = new StringBuffer();
		Enumeration<?> e = request.getParameterNames();
		if (e != null) {
			posted.append("?");
		}
		while (e.hasMoreElements()) {
			if (posted.length() > 1) {
				posted.append("&");
			}
			String curr = (String) e.nextElement();
			posted.append(curr + "=");
			if (curr.contains("password") || curr.contains("pass") || curr.contains("pwd")) {
				posted.append("*****");
			} else {
				posted.append(request.getParameter(curr));
			}
		}
		String ip = request.getHeader("X-FORWARDED-FOR");
		String ipAddr = (ip == null) ? getRemoteAddr(request) : ip;
		if (ipAddr != null && !ipAddr.equals("")) {
			posted.append("&_psip=" + ipAddr);
		}
		return posted.toString();
	}

	private String getRemoteAddr(HttpServletRequest request) {
		String ipFromHeader = request.getHeader("X-FORWARDED-FOR");
		if (ipFromHeader != null && ipFromHeader.length() > 0) {
			logger.debug("ip from proxy - X-FORWARDED-FOR : " + ipFromHeader);
			return ipFromHeader;
		}
		return request.getRemoteAddr();
	}
}
