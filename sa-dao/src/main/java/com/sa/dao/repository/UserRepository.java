package com.sa.dao.repository;

import org.springframework.data.repository.CrudRepository;

import com.sa.dao.pojo.User;

/**
 * The <code>UserRepository</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
public interface UserRepository extends CrudRepository<User, Integer> {
	User findByEmail(String username);
}