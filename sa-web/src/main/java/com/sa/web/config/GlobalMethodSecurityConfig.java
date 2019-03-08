package com.sa.web.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.expression.method.ExpressionBasedPreInvocationAdvice;
import org.springframework.security.access.vote.AuthenticatedVoter;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

import com.sa.security.authorization.CustomAuthorizationVoter;

/**
 * The <code>CustomGlobalMethodSecurityConfiguration</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class GlobalMethodSecurityConfig extends GlobalMethodSecurityConfiguration {

	@Override
	public AccessDecisionManager accessDecisionManager() {
		List<AccessDecisionVoter<? extends Object>> decisionVoters = Arrays.asList(new AuthenticatedVoter(),
				new CustomAuthorizationVoter(new ExpressionBasedPreInvocationAdvice()));
		return new UnanimousBased(decisionVoters);
	}

}