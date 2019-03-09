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
package com.sa.security.authorization;

import java.lang.reflect.Method;
import java.util.Collection;

import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.prepost.PreInvocationAuthorizationAdvice;
import org.springframework.security.access.prepost.PreInvocationAuthorizationAdviceVoter;
import org.springframework.security.core.Authentication;

/**
 * The <code>AuthorizationVoter</code> is a spring security voter that determines if the user has access to the desired
 * resource. Primary purpose of this class is to wrapper spring security classes and to log if access is denied. The
 * vote method in this will invoke if there is conflict in authorizations to a method. For example at global to you
 * allowed particular method and you restricted at method level this will come into picture.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class CustomAuthorizationVoter extends PreInvocationAuthorizationAdviceVoter {

	private static Logger logger = LoggerFactory.getLogger(CustomAuthorizationVoter.class);

	public CustomAuthorizationVoter(PreInvocationAuthorizationAdvice pre) {
		super(pre);
	}

	@Override
	public int vote(Authentication authentication, MethodInvocation object, Collection<ConfigAttribute> attributes) {
		int result = super.vote(authentication, object, attributes);
		if (result == ACCESS_DENIED) {
			Method method = object.getMethod();
			String errorDetail = getPreAuthorizeContent(method);
			logger.error("Access to {}.{}() denied for {} (Authorization \"{}\" failed )",
					method.getDeclaringClass().getSimpleName(), method.getName(), authentication.getName(),
					errorDetail);
		}
		return result;
	}

	/**
	 * Pull the <code>@PreAuthorize</code> from the method so we can log a better message. Spring security does have
	 * this info in the ConfigAttibute implementation, but the classes are package private and so not accessible
	 * 
	 * @param method the method bing invoked.
	 * @return the vaule in the PreAuthorize tag, if present.
	 */
	protected String getPreAuthorizeContent(Method method) {
		PreAuthorize preAuth = method.getAnnotation(PreAuthorize.class);
		if (preAuth == null) {
			preAuth = method.getDeclaringClass().getAnnotation(PreAuthorize.class);
		}
		return preAuth == null ? null : preAuth.value();
	}

}
