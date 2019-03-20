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
package com.sa.web.pojo;

import java.util.HashMap;

/**
 * The <code>ReturnObject</code> is common return for most controllers.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class ReturnObject extends HashMap<String, Object>{

	private static final long serialVersionUID = 6629753963335762757L;

	public ReturnObject() {
		put("success", true);
	}

	/**
	 * @param error
	 */
	public void setErrorMessage(String error) {
		put("success", false);
		put("errMsg", error);
	}

	/**
	 * @param result
	 */
	public void setResult(Object result) {
		put("result", result);
	}

	/**
	 * @param key
	 * @param result
	 */
	public void addObject(String key, Object result) {
		put(key, result);
	}

}
