package com.semantic.saas.security;

/**
 * Thread local storage for tenant (customer) ID.
 * This allows repository methods to access the current tenant context.
 */
public class TenantContext {

    private static final ThreadLocal<Long> CURRENT_TENANT = new ThreadLocal<>();

    /**
     * Set the current tenant ID
     * @param tenantId The tenant ID
     */
    public static void setCurrentTenant(Long tenantId) {
        CURRENT_TENANT.set(tenantId);
    }

    /**
     * Get the current tenant ID
     * @return The current tenant ID
     */
    public static Long getCurrentTenant() {
        return CURRENT_TENANT.get();
    }

    /**
     * Clear the current tenant context
     */
    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
