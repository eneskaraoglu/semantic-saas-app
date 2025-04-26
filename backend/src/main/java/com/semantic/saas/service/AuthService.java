package com.semantic.saas.service;

import com.semantic.saas.model.Customer;
import com.semantic.saas.model.User;
import com.semantic.saas.repository.CustomerRepository;
import com.semantic.saas.repository.RoleRepository;
import com.semantic.saas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    /**
     * Register a new customer with an admin user
     * @param companyName The company name
     * @param firstName The admin user's first name
     * @param lastName The admin user's last name
     * @param email The admin user's email
     * @param password The admin user's password
     * @return The created user
     */
    @Transactional
    public User registerCustomer(String companyName, String firstName, String lastName, String email, String password) {
        // Check if company name is already taken
        if (customerRepository.existsByName(companyName)) {
            throw new IllegalArgumentException("Company name already exists: " + companyName);
        }
        
        // Check if email is already taken
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }
        
        // Create new customer
        Customer customer = new Customer();
        customer.setName(companyName);
        customer = customerRepository.save(customer);
        
        // Create admin user
        User user = new User();
        user.setCustomer(customer);
        user.setUsername(email); // Use email as username
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(true);
        
        // Assign ADMIN role
        roleRepository.findByName("ROLE_ADMIN").ifPresent(user::addRole);
        
        return userRepository.save(user);
    }

    /**
     * Authenticate a user and generate a JWT token
     * @param email The user's email
     * @param password The user's password
     * @return The JWT token
     */
    public String login(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
        
        return jwtService.generateToken(user);
    }

    /**
     * Get user by email
     * @param email The user's email
     * @return The user
     */
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    /**
     * Create a new user for an existing customer
     * @param customerId The customer ID
     * @param username The username
     * @param email The email
     * @param firstName The first name
     * @param lastName The last name
     * @param password The password
     * @param roleNames The role names to assign
     * @return The created user
     */
    @Transactional
    public User createUser(Long customerId, String username, String email, String firstName, String lastName, 
                          String password, Set<String> roleNames) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists: " + username);
        }
        
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }
        
        // Get customer
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id " + customerId));
        
        // Create user
        User user = new User();
        user.setCustomer(customer);
        user.setUsername(username);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(passwordEncoder.encode(password));
        user.setEnabled(true);
        
        // Assign roles
        Set<String> validRoleNames = new HashSet<>(roleNames);
        for (String roleName : validRoleNames) {
            roleRepository.findByName(roleName).ifPresent(user::addRole);
        }
        
        return userRepository.save(user);
    }
}
