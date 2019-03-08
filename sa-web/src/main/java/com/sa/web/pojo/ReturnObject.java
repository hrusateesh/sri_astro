package com.sa.web.pojo;

import java.util.HashMap;
import java.util.Map;

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
		put("result", new Object());
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
