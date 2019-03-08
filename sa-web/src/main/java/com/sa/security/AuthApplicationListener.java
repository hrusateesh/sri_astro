package com.sa.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthApplicationListener {

	private static final Logger logger = LoggerFactory.getLogger(AuthApplicationListener.class);

	@EventListener
	public void handleInteractiveAuthenticationSuccess(InteractiveAuthenticationSuccessEvent event) {
		if (UsernamePasswordAuthenticationToken.class.isAssignableFrom(event.getAuthentication().getClass())) {
			logger.info("Username & Password Authentication Successful");
		} else if (RememberMeAuthenticationToken.class.isAssignableFrom(event.getAuthentication().getClass())) {
			logger.info("Remember me Authentication Successful");
		}
	}
}