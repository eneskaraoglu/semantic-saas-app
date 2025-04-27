package com.semantic.saas.repository;

import com.semantic.saas.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
    /**
     * Find a customer by name
     * @param name the customer name
     * @return an Optional containing the customer if found
     */
    Optional<Customer> findByName(String name);

    Optional<Customer> findById(Integer id);
    
    /**
     * Check if a customer with the given name exists
     * @param name the customer name
     * @return true if a customer with the name exists, false otherwise
     */
    boolean existsByName(String name);
}
