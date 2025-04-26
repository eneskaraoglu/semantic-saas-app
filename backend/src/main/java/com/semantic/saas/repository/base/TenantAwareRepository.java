package com.semantic.saas.repository.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

/**
 * Base repository interface for tenant aware entities.
 * This is a marker interface that indicates repositories that should apply tenant filtering.
 */
@NoRepositoryBean
public interface TenantAwareRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {
    // This is a marker interface
}
