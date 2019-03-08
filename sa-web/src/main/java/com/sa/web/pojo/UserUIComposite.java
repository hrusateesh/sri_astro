package com.sa.web.pojo;

import com.sa.dao.pojo.User;

public class UserUIComposite {
	private String firstName;
	private String lastName;
	private String email;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static UserUIComposite fromUser(User user) {
		UserUIComposite composite = new UserUIComposite();
		composite.setEmail(user.getEmail());
		composite.setFirstName(user.getFirstName());
		composite.setLastName(user.getLastName());
		return composite;
	}
}
