package com.semantic.saas.service;

import com.semantic.saas.model.Role;
import com.semantic.saas.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * Get all roles
     * @return List of all roles
     */
    @Transactional(readOnly = true)
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    /**
     * Get role by ID
     * @param id The role ID
     * @return Optional containing the role if found
     */
    @Transactional(readOnly = true)
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    /**
     * Get role by name
     * @param name The role name
     * @return Optional containing the role if found
     */
    @Transactional(readOnly = true)
    public Optional<Role> getRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    /**
     * Create a new role
     * @param role The role to create
     * @return The created role
     */
    @Transactional
    public Role createRole(Role role) {
        // Check if role with same name already exists
        if (roleRepository.existsByName(role.getName())) {
            throw new IllegalArgumentException("Role with name " + role.getName() + " already exists");
        }
        
        return roleRepository.save(role);
    }

    /**
     * Update an existing role
     * @param id The ID of the role to update
     * @param roleDetails The updated role details
     * @return The updated role
     */
    @Transactional
    public Role updateRole(Long id, Role roleDetails) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with id " + id));
        
        // Update the role details
        role.setName(roleDetails.getName());
        role.setDescription(roleDetails.getDescription());
        
        return roleRepository.save(role);
    }

    /**
     * Delete a role
     * @param id The ID of the role to delete
     */
    @Transactional
    public void deleteRole(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found with id " + id));
        
        roleRepository.delete(role);
    }
}
