package com.semantic.saas.service;

import com.semantic.saas.model.Customer;
import com.semantic.saas.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     * Get all customers
     * @return List of all customers
     */
    @Transactional(readOnly = true)
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Get customer by ID
     * @param id The customer ID
     * @return Optional containing the customer if found
     */
    @Transactional(readOnly = true)
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    /**
     * Get customer by name
     * @param name The customer name
     * @return Optional containing the customer if found
     */
    @Transactional(readOnly = true)
    public Optional<Customer> getCustomerByName(String name) {
        return customerRepository.findByName(name);
    }

    /**
     * Create a new customer
     * @param customer The customer to create
     * @return The created customer
     */
    @Transactional
    public Customer createCustomer(Customer customer) {
        // Check if customer with same name already exists
        if (customerRepository.existsByName(customer.getName())) {
            throw new IllegalArgumentException("Customer with name " + customer.getName() + " already exists");
        }
        
        return customerRepository.save(customer);
    }

    /**
     * Update an existing customer
     * @param id The ID of the customer to update
     * @param customerDetails The updated customer details
     * @return The updated customer
     */
    @Transactional
    public Customer updateCustomer(Long id, Customer customerDetails) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id " + id));
        
        // Update the customer details
        customer.setName(customerDetails.getName());
        
        return customerRepository.save(customer);
    }

    /**
     * Delete a customer
     * @param id The ID of the customer to delete
     */
    @Transactional
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id " + id));
        
        customerRepository.delete(customer);
    }
}
