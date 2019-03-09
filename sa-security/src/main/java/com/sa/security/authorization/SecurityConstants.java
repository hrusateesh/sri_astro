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

/**
 * The <code>SecurityContants</code> defines any constants
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public final class SecurityConstants {

	public static final String ENVIRONMENT = "spring.profiles.active";
	public static final String ENVIRONMENT_LOCAL = "local";
	public static final String SESSION_TIME_OUT = "timedOut";
	public static final String SESSION_TIMED_INVALIDATE = "invalidate";

	public static enum ExclusionPages {
		ERROR("error"), LOGOUT("logout"), SESSIONTIME_OUT("sessionTimeOut"), HTTP_VIWER("httpviewer"),
		NO_ACCESS("noaccess"), PASSWORD_EXPIRED("passwordExpired"), DB("db");

		private String description;

		private ExclusionPages(String description) {
			this.description = description;

		}

		public String getDescription() {
			return description;
		}
	}

	public static final String USER_INFO = "userInfo";
	public static final String HTTP_UID = "uid";

	private SecurityConstants() {
	}
}
