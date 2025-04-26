package com.semantic.saas.config;

import com.semantic.saas.repository.base.TenantAwareRepository;
import com.semantic.saas.repository.base.TenantAwareRepositoryImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Configuration class for repositories.
 * This class registers our custom repository implementation.
 */
@Configuration
@EnableJpaRepositories(
        basePackages = "com.semantic.saas.repository",
        repositoryBaseClass = TenantAwareRepositoryImpl.class
)
public class RepositoryConfig {
    // Configuration class
}
