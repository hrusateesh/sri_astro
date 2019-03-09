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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class SessionTimerInterceptor extends HandlerInterceptorAdapter {

	private static Logger log = LoggerFactory.getLogger(SessionTimerInterceptor.class);

	private static final long MAX_INACTIVE_SESSION_TIME = 5 * 100000;

	@Autowired
	private HttpSession session;

	/**
	 * Executed before actual handler is executed
	 **/
	@Override
	public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler)
			throws Exception {
		log.info("Pre handle method - check handling start time");
		long startTime = System.currentTimeMillis();
		request.setAttribute("executionTime", startTime);
		if (UserInterceptor.isUserLogged()) {
			session = request.getSession();
			log.info("Time since last request in this session: {} ms",
					System.currentTimeMillis() - request.getSession().getLastAccessedTime());
			if (System.currentTimeMillis() - session.getLastAccessedTime() > MAX_INACTIVE_SESSION_TIME) {
				log.warn("Logging out, due to inactive session");
				SecurityContextHolder.clearContext();
				request.logout();
				response.sendRedirect("/logout");
			}
		}
		return true;
	}

	/**
	 * Executed before after handler is executed
	 **/
	@Override
	public void postHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler,
			final ModelAndView model) throws Exception {
		log.info("Post handle method - check execution time of handling");
		long startTime = (Long) request.getAttribute("executionTime");
		log.info("Execution time for handling the request was: {} ms", System.currentTimeMillis() - startTime);
	}
}
