package com.sa.web.config;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sa.security.authentication.CustomRequestHeaderAuthenticationFilter;
import com.sa.security.authentication.PreAuthenticatedAuthProvider;
import com.sa.security.authentication.SiteminderAuthenticationDetailsSource;

/**
 * The <code>WebMvcConfig</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
//@Configuration
//@ComponentScan(value = "com.sa")
public class WebMvcConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

	@Autowired
	private PreAuthenticatedAuthProvider authenticationProvider;
	
	@Autowired
	private SiteminderAuthenticationDetailsSource authenticationDetailsSource;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.inMemoryAuthentication().withUser("user1").password("{noop}password1").roles("USER").and()
//				.withUser("admin").password("{noop}admin").roles("USER", "ADMIN");
		auth.authenticationProvider(authenticationProvider);
	}

	protected Filter requestHeaderAuthenticationFilter() throws Exception {
		CustomRequestHeaderAuthenticationFilter filter = new CustomRequestHeaderAuthenticationFilter();
		filter.setPrincipalRequestHeader("UID");
		filter.setAuthenticationManager(authenticationManager());
		filter.setAuthenticationDetailsSource(authenticationDetailsSource);
		return filter;
	}

}