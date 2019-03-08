package com.sa.security.authorization;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.sa.web.pojo.UserComposite;

/**
 * The <code>SecurityAuthorizationContext</code> holds all the related information for the authorization module.
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class SecurityAuthorizationContext {

	private UserComposite userComposite;
	private List<String> errors;
	private String userId;
	private String requestedResourceName;
	private String redirectPage;
	private boolean logOut;
	private HttpServletRequest request;
	private HttpSession session;

	public SecurityAuthorizationContext() {
		errors = new ArrayList<>();
	}

	public UserComposite getUserComposite() {
		return userComposite;
	}

	public void setUserComposite(UserComposite userComposite) {
		this.userComposite = userComposite;
	}

	public void addErrors(String message) {
		this.errors.add(message);
	}

	public List<String> getErrors() {
		return errors;
	}

	public void setErrors(List<String> errors) {
		this.errors = errors;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRequestedResourceName() {
		return requestedResourceName;
	}

	public void setRequestedResourceName(String requestedResourceName) {
		this.requestedResourceName = requestedResourceName;
	}

	public String getRedirectPage() {
		return redirectPage;
	}

	public void setRedirectPage(String redirectPage) {
		this.redirectPage = redirectPage;
	}

	public boolean isLogOut() {
		return logOut;
	}

	public void setLogOut(boolean logOut) {
		this.logOut = logOut;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpSession getSession() {
		return session;
	}

	public void setSession(HttpSession session) {
		this.session = session;
	}

}
