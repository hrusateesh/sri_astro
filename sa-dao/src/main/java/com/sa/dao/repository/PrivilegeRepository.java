package com.sa.dao.repository;

import org.springframework.data.repository.CrudRepository;

import com.sa.dao.pojo.Privilege;

public interface PrivilegeRepository extends CrudRepository<Privilege, Integer> {
	Privilege findByName(String name);
}