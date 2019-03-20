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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

/**
 * The <code>AuthApplicationListener</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Component
public class AuthApplicationListener {

	private static final Logger logger = LoggerFactory.getLogger(AuthApplicationListener.class);

	@EventListener
	public void handleInteractiveAuthenticationSuccess(InteractiveAuthenticationSuccessEvent event) {
		if (UsernamePasswordAuthenticationToken.class.isAssignableFrom(event.getAuthentication().getClass())) {
			logger.info("Authentication successful with provided username & password.");
		} else if (RememberMeAuthenticationToken.class.isAssignableFrom(event.getAuthentication().getClass())) {
			logger.info("Authentication successful with provided remember me token.");
		}
	}
}
