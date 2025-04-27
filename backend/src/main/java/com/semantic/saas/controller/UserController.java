package com.semantic.saas.controller;

import com.semantic.saas.dto.UserDTO;
import com.semantic.saas.model.Role;
import com.semantic.saas.model.User;
import com.semantic.saas.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users
     * @return List of all users
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    /**
     * Get users by customer ID
     * @param customerId The customer ID
     * @return List of users for the customer
     */
    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.isFromCustomer(#customerId)")
    public ResponseEntity<List<UserDTO>> getUsersByCustomer(@PathVariable Long customerId) {
        List<User> users = userService.getUsersByCustomerId(customerId);
        List<UserDTO> userDTOs = users.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOs);
    }

    /**
     * Get a user by ID
     * @param id The user ID
     * @return The user
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.canAccessUser(#id)")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return ResponseEntity.ok(convertToDTO(user));
    }

    /**
     * Create a new user
     * @param userDTO The user data
     * @return The created user
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        try {
            User user = convertToEntity(userDTO);
            User createdUser = userService.createUser(user, userDTO.getCustomerId(), userDTO.getRoles());
            return new ResponseEntity<>(convertToDTO(createdUser), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Update an existing user
     * @param id The user ID
     * @param userDTO The updated user data
     * @return The updated user
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @securityService.canAccessUser(#id)")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        try {
            User userDetails = convertToEntity(userDTO);
            User updatedUser = userService.updateUser(id, userDetails);
            
            // Update roles if provided
            if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
                updatedUser = userService.updateUserRoles(id, userDTO.getRoles());
            }
            
            return ResponseEntity.ok(convertToDTO(updatedUser));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    /**
     * Delete a user
     * @param id The user ID
     * @return No content
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    /**
     * Convert a User entity to a UserDTO
     * @param user The user entity
     * @return The user DTO
     */
    private UserDTO convertToDTO(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
        
        return new UserDTO(
                (Long) user.getId().longValue(),
                (Long) user.getCustomer().getId().longValue(),
                user.getUsername(),
                user.getEmail(),
                null, // Don't include password in DTO
                user.getFirstName(),
                user.getLastName(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                roleNames
        );
    }

    /**
     * Convert a UserDTO to a User entity
     * @param userDTO The user DTO
     * @return The user entity
     */
    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        
        if (userDTO.getId() != null) {
            user.setId(userDTO.getId().intValue());
        }
        
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEnabled(userDTO.isEnabled());
        
        return user;
    }
}
