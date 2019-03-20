package com.sa.dao.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseCrudRepository<T> extends CrudRepository<T, Integer> {

    @Override
    List<T> findAll();

}