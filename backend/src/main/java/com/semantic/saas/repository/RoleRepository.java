package com.semantic.saas.repository;

import com.semantic.saas.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    /**
     * Find a role by name
     * @param name the role name
     * @return an Optional containing the role if found
     */
    Optional<Role> findByName(String name);
    
    /**
     * Check if a role with the given name exists
     * @param name the role name
     * @return true if a role with the name exists, false otherwise
     */
    boolean existsByName(String name);
}
