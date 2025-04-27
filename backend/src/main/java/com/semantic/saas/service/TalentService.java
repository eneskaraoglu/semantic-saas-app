package com.semantic.saas.service;

import com.semantic.saas.model.Customer;
import com.semantic.saas.model.Talent;
import com.semantic.saas.repository.CustomerRepository;
import com.semantic.saas.repository.TalentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TalentService {

    private final TalentRepository talentRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public TalentService(TalentRepository talentRepository, CustomerRepository customerRepository) {
        this.talentRepository = talentRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public Page<Talent> getAllTalents(Integer customerId, Pageable pageable) {
        return talentRepository.findAllByCustomerId(customerId, pageable);
    }

    @Transactional(readOnly = true)
    public List<Talent> getAllTalents(Integer customerId) {
        return talentRepository.findAllByCustomerId(customerId);
    }

    @Transactional(readOnly = true)
    public Talent getTalentById(Integer talentId, Integer customerId) {
        return talentRepository.findByIdAndCustomerId(talentId, customerId)
                .orElseThrow(() -> new EntityNotFoundException("Talent not found with id " + talentId));
    }

    @Transactional
    public Talent createTalent(Talent talent, Integer customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with id " + customerId));
        
        talent.setCustomer(customer);
        return talentRepository.save(talent);
    }

    @Transactional
    public Talent updateTalent(Integer talentId, Talent talentDetails, Integer customerId) {
        Talent talent = getTalentById(talentId, customerId);
        
        // Update talent attributes
        talent.setFirstName(talentDetails.getFirstName());
        talent.setLastName(talentDetails.getLastName());
        talent.setEmail(talentDetails.getEmail());
        talent.setPhone(talentDetails.getPhone());
        talent.setSkills(talentDetails.getSkills());
        talent.setExperience(talentDetails.getExperience());
        talent.setEducation(talentDetails.getEducation());
        talent.setDateOfBirth(talentDetails.getDateOfBirth());
        talent.setLocation(talentDetails.getLocation());
        talent.setLinkedinUrl(talentDetails.getLinkedinUrl());
        talent.setGithubUrl(talentDetails.getGithubUrl());
        talent.setPortfolioUrl(talentDetails.getPortfolioUrl());
        talent.setResumeUrl(talentDetails.getResumeUrl());
        talent.setCurrentPosition(talentDetails.getCurrentPosition());
        talent.setDesiredPosition(talentDetails.getDesiredPosition());
        talent.setSalaryExpectation(talentDetails.getSalaryExpectation());
        talent.setAvailability(talentDetails.getAvailability());
        talent.setNotes(talentDetails.getNotes());
        
        return talentRepository.save(talent);
    }

    @Transactional
    public void deleteTalent(Integer talentId, Integer customerId) {
        Talent talent = getTalentById(talentId, customerId);
        talentRepository.delete(talent);
    }

    @Transactional(readOnly = true)
    public Page<Talent> searchTalents(Integer customerId, String keyword, Pageable pageable) {
        return talentRepository.search(customerId, keyword, pageable);
    }

    @Transactional(readOnly = true)
    public long countTalents(Integer customerId) {
        return talentRepository.countByCustomerId(customerId);
    }
}
