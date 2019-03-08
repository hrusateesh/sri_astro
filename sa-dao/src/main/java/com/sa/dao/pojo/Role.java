package com.sa.dao.pojo;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

/**
 * The <code>Role</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@Entity
public class Role extends AbstractDomainClass {

	private String name;
	private String description;

	@ManyToMany(mappedBy = "roles")
	private List<User> users = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "role_privilege", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id"))
	private List<Privilege> privileges;

	public Role() {
		super();
	}

	public Role(final String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String role) {
		this.name = role;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public void addUser(User user) {
		if (!this.users.contains(user)) {
			this.users.add(user);
		}

		if (!user.getRoles().contains(this)) {
			user.getRoles().add(this);
		}
	}

	public void removeUser(User user) {
		this.users.remove(user);
		user.getRoles().remove(this);
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Privilege> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(final List<Privilege> privileges) {
		this.privileges = privileges;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(final Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final Role role = (Role) obj;
		if (!name.equals(role.name)) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		final StringBuilder builder = new StringBuilder();
		builder.append("Role [name=").append(name).append("]").append("[id=").append(id).append("]");
		return builder.toString();
	}

}