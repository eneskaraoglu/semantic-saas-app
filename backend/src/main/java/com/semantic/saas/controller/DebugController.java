package com.semantic.saas.controller;

import com.semantic.saas.model.User;
import com.semantic.saas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/public/debug")
public class DebugController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;

    @Autowired
    public DebugController(
            UserRepository userRepository, 
            PasswordEncoder passwordEncoder,
            UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers() {
        List<Map<String, Object>> users = new ArrayList<>();
        
        for (User user : userRepository.findAll()) {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("email", user.getEmail());
            userMap.put("username", user.getUsername());
            userMap.put("enabled", user.isEnabled());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            
            // Don't expose actual password hash
            userMap.put("hasPassword", user.getPassword() != null && !user.getPassword().isEmpty());
            
            users.add(userMap);
        }
        
        return ResponseEntity.ok(users);
    }

    @PostMapping("/check-password")
    public ResponseEntity<?> checkPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Try to find the user
            Optional<User> userOptional = userRepository.findByEmail(email);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Check if the password matches
                boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
                
                response.put("userExists", true);
                response.put("passwordMatches", passwordMatches);
                response.put("storedPasswordHash", user.getPassword());
                
                return ResponseEntity.ok(response);
            } else {
                response.put("userExists", false);
                response.put("error", "User not found with email: " + email);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<User> userOptional = userRepository.findByEmail(email);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Encode and set the new password
                String encodedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encodedPassword);
                userRepository.save(user);
                
                response.put("success", true);
                response.put("message", "Password reset successfully");
                response.put("newPasswordHash", encodedPassword);
                
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("error", "User not found with email: " + email);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/encode-password")
    public ResponseEntity<?> encodePassword(@RequestParam String rawPassword) {
        Map<String, String> response = new HashMap<>();
        response.put("encodedPassword", passwordEncoder.encode(rawPassword));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-details")
    public ResponseEntity<?> getUserDetails(@RequestParam String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            
            response.put("username", userDetails.getUsername());
            response.put("hasPassword", userDetails.getPassword() != null && !userDetails.getPassword().isEmpty());
            response.put("isEnabled", userDetails.isEnabled());
            response.put("isAccountNonExpired", userDetails.isAccountNonExpired());
            response.put("isCredentialsNonExpired", userDetails.isCredentialsNonExpired());
            response.put("isAccountNonLocked", userDetails.isAccountNonLocked());
            response.put("authorities", userDetails.getAuthorities());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
