package com.semantic.saas.repository;

import com.semantic.saas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find a user by username
     * @param username the username
     * @return an Optional containing the user if found
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Find a user by email
     * @param email the email address
     * @return an Optional containing the user if found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if a user with the given username exists
     * @param username the username
     * @return true if a user with the username exists, false otherwise
     */
    boolean existsByUsername(String username);
    
    /**
     * Check if a user with the given email exists
     * @param email the email address
     * @return true if a user with the email exists, false otherwise
     */
    boolean existsByEmail(String email);
    
    /**
     * Find all users belonging to a specific customer
     * @param customerId the customer ID
     * @return a list of users belonging to the customer
     */
    List<User> findByCustomerId(Long customerId);
    
    /**
     * Find users by role name within a specific customer
     * @param customerId the customer ID
     * @param roleName the role name
     * @return a list of users with the specified role in the customer
     */
    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.customer.id = :customerId AND r.name = :roleName")
    List<User> findByCustomerIdAndRoleName(@Param("customerId") Long customerId, @Param("roleName") String roleName);
}
