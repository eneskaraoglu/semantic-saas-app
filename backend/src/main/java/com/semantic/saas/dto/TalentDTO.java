package com.semantic.saas.dto;

import com.semantic.saas.model.Talent;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TalentDTO {
    
    private Integer id;
    
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be less than 50 characters")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be less than 50 characters")
    private String lastName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;
    
    @Size(max = 20, message = "Phone number must be less than 20 characters")
    private String phone;
    
    private String skills;
    
    private String experience;
    
    private String education;
    
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    
    private String location;
    
    private String linkedinUrl;
    
    private String githubUrl;
    
    private String portfolioUrl;
    
    private String resumeUrl;
    
    private String currentPosition;
    
    private String desiredPosition;
    
    private Double salaryExpectation;
    
    private String availability;
    
    private String notes;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    // Default constructor
    public TalentDTO() {
    }
    
    // Constructor for conversion from entity
    public TalentDTO(Talent talent) {
        this.id = talent.getId();
        this.firstName = talent.getFirstName();
        this.lastName = talent.getLastName();
        this.email = talent.getEmail();
        this.phone = talent.getPhone();
        this.skills = talent.getSkills();
        this.experience = talent.getExperience();
        this.education = talent.getEducation();
        this.dateOfBirth = talent.getDateOfBirth();
        this.location = talent.getLocation();
        this.linkedinUrl = talent.getLinkedinUrl();
        this.githubUrl = talent.getGithubUrl();
        this.portfolioUrl = talent.getPortfolioUrl();
        this.resumeUrl = talent.getResumeUrl();
        this.currentPosition = talent.getCurrentPosition();
        this.desiredPosition = talent.getDesiredPosition();
        this.salaryExpectation = talent.getSalaryExpectation();
        this.availability = talent.getAvailability();
        this.notes = talent.getNotes();
        this.createdAt = talent.getCreatedAt();
        this.updatedAt = talent.getUpdatedAt();
    }
    
    // Method to convert DTO to Entity
    public Talent toEntity() {
        Talent talent = new Talent();
        talent.setId(this.id);
        talent.setFirstName(this.firstName);
        talent.setLastName(this.lastName);
        talent.setEmail(this.email);
        talent.setPhone(this.phone);
        talent.setSkills(this.skills);
        talent.setExperience(this.experience);
        talent.setEducation(this.education);
        talent.setDateOfBirth(this.dateOfBirth);
        talent.setLocation(this.location);
        talent.setLinkedinUrl(this.linkedinUrl);
        talent.setGithubUrl(this.githubUrl);
        talent.setPortfolioUrl(this.portfolioUrl);
        talent.setResumeUrl(this.resumeUrl);
        talent.setCurrentPosition(this.currentPosition);
        talent.setDesiredPosition(this.desiredPosition);
        talent.setSalaryExpectation(this.salaryExpectation);
        talent.setAvailability(this.availability);
        talent.setNotes(this.notes);
        return talent;
    }
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getSkills() {
        return skills;
    }
    
    public void setSkills(String skills) {
        this.skills = skills;
    }
    
    public String getExperience() {
        return experience;
    }
    
    public void setExperience(String experience) {
        this.experience = experience;
    }
    
    public String getEducation() {
        return education;
    }
    
    public void setEducation(String education) {
        this.education = education;
    }
    
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getLinkedinUrl() {
        return linkedinUrl;
    }
    
    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }
    
    public String getGithubUrl() {
        return githubUrl;
    }
    
    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
    
    public String getPortfolioUrl() {
        return portfolioUrl;
    }
    
    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }
    
    public String getResumeUrl() {
        return resumeUrl;
    }
    
    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
    
    public String getCurrentPosition() {
        return currentPosition;
    }
    
    public void setCurrentPosition(String currentPosition) {
        this.currentPosition = currentPosition;
    }
    
    public String getDesiredPosition() {
        return desiredPosition;
    }
    
    public void setDesiredPosition(String desiredPosition) {
        this.desiredPosition = desiredPosition;
    }
    
    public Double getSalaryExpectation() {
        return salaryExpectation;
    }
    
    public void setSalaryExpectation(Double salaryExpectation) {
        this.salaryExpectation = salaryExpectation;
    }
    
    public String getAvailability() {
        return availability;
    }
    
    public void setAvailability(String availability) {
        this.availability = availability;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
