package com.semantic.saas.repository.base;

import com.semantic.saas.security.TenantContext;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import java.io.Serializable;
import java.util.List;

/**
 * Implementation of TenantAwareRepository that automatically filters queries by customer ID.
 * This class intercepts queries and adds a customer ID filter based on the current tenant context.
 */
public class TenantAwareRepositoryImpl<T, ID extends Serializable> 
        extends SimpleJpaRepository<T, ID> implements TenantAwareRepository<T, ID> {

    private final EntityManager entityManager;
    private final JpaEntityInformation<T, ?> entityInformation;

    public TenantAwareRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
        this.entityInformation = entityInformation;
    }

    @Override
    public List<T> findAll() {
        return findAll(createTenantSpecification());
    }

    @Override
    public List<T> findAllById(Iterable<ID> ids) {
        // Create a query that filters by IDs and customer ID
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> query = cb.createQuery(entityInformation.getJavaType());
        Root<T> root = query.from(entityInformation.getJavaType());

        // Create a predicate for the IDs
        Predicate idPredicate = root.get(entityInformation.getIdAttribute().getName()).in(ids);
        
        // Add the tenant predicate
        Long tenantId = TenantContext.getCurrentTenant();
        if (tenantId != null) {
            Predicate tenantPredicate = cb.equal(root.get("customer").get("id"), tenantId);
            query.where(cb.and(idPredicate, tenantPredicate));
        } else {
            query.where(idPredicate);
        }

        TypedQuery<T> typedQuery = entityManager.createQuery(query);
        return typedQuery.getResultList();
    }

    /**
     * Create a specification that filters by the current tenant ID
     */
    private Specification<T> createTenantSpecification() {
        return (root, query, cb) -> {
            Long tenantId = TenantContext.getCurrentTenant();
            if (tenantId != null) {
                return cb.equal(root.get("customer").get("id"), tenantId);
            }
            return null;
        };
    }
}
