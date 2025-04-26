package com.semantic.saas.controller;

import com.semantic.saas.model.User;
import com.semantic.saas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * TEMPORARY CONTROLLER FOR PASSWORD RESET
 * Remove this controller after fixing your login issue
 */
@RestController
@RequestMapping("/api/public/reset")
public class PasswordResetController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordResetController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/password")
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPassword) {

        System.out.println(email);
        System.out.println(newPassword);

        Optional<User> userOptional = userRepository.findByEmail(email);
        
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println(user.getUsername());
            System.out.println(user.getEmail());
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password for user " + email + " has been reset successfully");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "User not found with email: " + email);
            return ResponseEntity.badRequest().body(response);
        }
    }
}