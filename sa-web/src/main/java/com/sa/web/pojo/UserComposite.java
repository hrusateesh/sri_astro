package com.sa.web.pojo;

import java.io.Serializable;
import java.util.List;

import com.sa.dao.pojo.Role;
import com.sa.dao.pojo.User;

/**
 * The <code>UserComposite</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public class UserComposite implements Serializable {

	private static final long serialVersionUID = 3998393120741511715L;
	private User user;
	private List<Role> roles;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

}
