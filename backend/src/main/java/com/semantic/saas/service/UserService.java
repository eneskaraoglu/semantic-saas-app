package com.semantic.saas.service;

import com.semantic.saas.model.Customer;
import com.semantic.saas.model.Role;
import com.semantic.saas.model.User;
import com.semantic.saas.repository.CustomerRepository;
import com.semantic.saas.repository.RoleRepository;
import com.semantic.saas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Get all users
     * @return List of all users
     */
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get all users for a specific customer
     * @param customerId The customer ID
     * @return List of users for the customer
     */
    @Transactional(readOnly = true)
    public List<User> getUsersByCustomerId(Long customerId) {
        return userRepository.findByCustomerId(customerId);
    }

    /**
     * Get user by ID
     * @param id The user ID
     * @return Optional containing the user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Get user by username
     * @param username The username
     * @return Optional containing the user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Get user by email
     * @param email The email address
     * @return Optional containing the user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Create a new user
     * @param user The user to create
     * @param customerId The customer ID
     * @param roleNames The role names to assign
     * @return The created user
     */
    @Transactional
    public User createUser(User user, Long customerId, Set<String> roleNames) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists: " + user.getUsername());
        }
        
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + user.getEmail());
        }
        
        // Get customer
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id " + customerId));
        
        // Set customer for the user
        user.setCustomer(customer);
        
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Assign roles
        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));
            roles.add(role);
        }
        
        for (Role role : roles) {
            user.addRole(role);
        }
        
        return userRepository.save(user);
    }

    /**
     * Update an existing user
     * @param id The ID of the user to update
     * @param userDetails The updated user details
     * @return The updated user
     */
    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + id));
        
        // Update the user details
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEnabled(userDetails.isEnabled());
        
        // Update password if provided
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        
        return userRepository.save(user);
    }

    /**
     * Update user roles
     * @param userId The user ID
     * @param roleNames The new set of role names
     * @return The updated user
     */
    @Transactional
    public User updateUserRoles(Long userId, Set<String> roleNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + userId));
        
        // Clear existing roles
        user.getRoles().clear();
        
        // Assign new roles
        for (String roleName : roleNames) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));
            user.addRole(role);
        }
        
        return userRepository.save(user);
    }

    /**
     * Delete a user
     * @param id The ID of the user to delete
     */
    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id " + id));
        
        userRepository.delete(user);
    }
}
