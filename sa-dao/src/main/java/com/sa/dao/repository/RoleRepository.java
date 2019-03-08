package com.sa.dao.repository;

import org.springframework.data.repository.CrudRepository;

import com.sa.dao.pojo.Role;

public interface RoleRepository extends CrudRepository<Role, Integer> {

	Role findByName(String name);
}