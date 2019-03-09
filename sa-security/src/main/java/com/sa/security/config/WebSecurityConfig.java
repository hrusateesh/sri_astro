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
package com.sa.security.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

import com.sa.security.JsonAuthHandler;
import com.sa.security.RestAuthenticationEntryPoint;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JsonAuthHandler jsonAuthsHandler;
	
	@Autowired
	private DataSource dataSource;
	
	@Value("${rememberme.key}")
    private String rememberMeKey;	

	@Bean
	public DaoAuthenticationProvider authenticationProvider(PasswordEncoder encoder) {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(encoder);
		daoAuthenticationProvider.setUserDetailsService(userDetailsService);
		return daoAuthenticationProvider;
	}
	
	private PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl repo = new JdbcTokenRepositoryImpl();
		repo.setDataSource(dataSource);
		return repo;
	}

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(11);
	}

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
//			.addFilterAfter(new CsrfTokenResponseHeaderBindingFilter(), CsrfFilter.class)
			.exceptionHandling()
			.authenticationEntryPoint(restAuthenticationEntryPoint)
            .and()
			.authorizeRequests()
				.antMatchers("/", "/home").permitAll()
				.antMatchers("/rest/**").authenticated()
				.and()
			.formLogin()
				.loginPage("/rest/login")
				.usernameParameter("username")
				.passwordParameter("password")
				.successHandler(jsonAuthsHandler)
				.failureHandler(jsonAuthsHandler)
				.permitAll()
				.and()
			.logout()
				.logoutUrl("/rest/logout")
				.logoutSuccessUrl("/")
				.logoutSuccessHandler(jsonAuthsHandler)
				.deleteCookies("remember-me", "JSESSIONID")
				.permitAll()
				.and()
			.rememberMe()
                .userDetailsService(userDetailsService)
	            .tokenRepository(persistentTokenRepository())
                .rememberMeCookieName("REMEMBER_ME")
                .rememberMeParameter("remember_me")
                .tokenValiditySeconds(1209600)  // default 2 weeks. in sec
                .useSecureCookie(false)
                .key(rememberMeKey)
                .and()
            .headers()
	            .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "http://localhost:3001"))
	            .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"))
	            .addHeaderWriter(new StaticHeadersWriter("Access-Control-Max-Age", "3600"))
	            .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials", "true"))
//	            .addHeaderWriter(new StaticHeadersWriter("Access-Control-Expose-Headers", "X-CSRF-TOKEN,X-CSRF-HEADER,X-CSRF-PARAM,JSESSIONID,REMEMBER_ME"))
	            .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Headers", "Origin,Accept,Content-Type,X-Requested-With,Access-Control-Request-Method,Access-Control-Allow-Credentials,Access-Control-Request-Headers"))
	            ;
	}

}
