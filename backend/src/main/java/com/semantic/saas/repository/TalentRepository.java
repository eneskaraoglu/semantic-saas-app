package com.semantic.saas.repository;

import com.semantic.saas.model.Talent;
import com.semantic.saas.repository.base.TenantAwareRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TalentRepository extends JpaRepository<Talent, Integer>, TenantAwareRepository<Talent, Integer> {
    
    @Query("SELECT t FROM Talent t WHERE t.customer.id = :customerId")
    List<Talent> findAllByCustomerId(@Param("customerId") Integer customerId);
    
    @Query("SELECT t FROM Talent t WHERE t.customer.id = :customerId")
    Page<Talent> findAllByCustomerId(@Param("customerId") Integer customerId, Pageable pageable);
    
    @Query("SELECT t FROM Talent t WHERE t.customer.id = :customerId AND t.id = :talentId")
    Optional<Talent> findByIdAndCustomerId(@Param("talentId") Integer talentId, @Param("customerId") Integer customerId);
    
    @Query("SELECT t FROM Talent t WHERE t.customer.id = :customerId AND (LOWER(t.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.skills) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Talent> search(@Param("customerId") Integer customerId, @Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT COUNT(t) FROM Talent t WHERE t.customer.id = :customerId")
    long countByCustomerId(@Param("customerId") Integer customerId);
}
