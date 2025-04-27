package com.semantic.saas.controller;

import com.semantic.saas.dto.ApiResponseDTO;
import com.semantic.saas.dto.PagedResponseDTO;
import com.semantic.saas.dto.TalentDTO;
import com.semantic.saas.model.Talent;
import com.semantic.saas.model.User;
import com.semantic.saas.service.AuthService;
import com.semantic.saas.service.TalentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/talents")
public class TalentController {

    private final TalentService talentService;
    private final AuthService authService;

    @Autowired
    public TalentController(TalentService talentService, AuthService authService) {
        this.talentService = talentService;
        this.authService = authService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<PagedResponseDTO<TalentDTO>> getAllTalents(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Talent> talents = talentService.getAllTalents(currentUser.getCustomer().getId(), pageable);
        
        PagedResponseDTO<TalentDTO> response = PagedResponseDTO.from(talents, talent -> new TalentDTO(talent));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<TalentDTO> getTalentById(
            @PathVariable(value = "id") Integer talentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        Talent talent = talentService.getTalentById(talentId, currentUser.getCustomer().getId());
        
        return ResponseEntity.ok(new TalentDTO(talent));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDTO> createTalent(
            @Valid @RequestBody TalentDTO talentDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        Talent talent = talentDTO.toEntity();
        Talent savedTalent = talentService.createTalent(talent, currentUser.getCustomer().getId());
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDTO.success("Talent created successfully", new TalentDTO(savedTalent)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDTO> updateTalent(
            @PathVariable(value = "id") Integer talentId,
            @Valid @RequestBody TalentDTO talentDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        Talent talent = talentDTO.toEntity();
        Talent updatedTalent = talentService.updateTalent(talentId, talent, currentUser.getCustomer().getId());
        
        return ResponseEntity.ok(ApiResponseDTO.success("Talent updated successfully", new TalentDTO(updatedTalent)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDTO> deleteTalent(
            @PathVariable(value = "id") Integer talentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        talentService.deleteTalent(talentId, currentUser.getCustomer().getId());
        
        return ResponseEntity.ok(ApiResponseDTO.success("Talent deleted successfully"));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<PagedResponseDTO<TalentDTO>> searchTalents(
            @RequestParam(value = "keyword", required = true) String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Talent> talents = talentService.searchTalents(currentUser.getCustomer().getId(), keyword, pageable);
        
        PagedResponseDTO<TalentDTO> response = PagedResponseDTO.from(talents, talent -> new TalentDTO(talent));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponseDTO> countTalents(@AuthenticationPrincipal UserDetails userDetails) {
        User currentUser = authService.getUserByEmail(userDetails.getUsername());
        
        long count = talentService.countTalents(currentUser.getCustomer().getId());
        
        return ResponseEntity.ok(ApiResponseDTO.success("Total number of talents retrieved", count));
    }
}
