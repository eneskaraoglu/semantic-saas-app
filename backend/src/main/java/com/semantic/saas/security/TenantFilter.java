package com.semantic.saas.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filter to set tenant context from JWT token.
 * This filter sets the tenant ID in a ThreadLocal variable for use in repositories.
 */
@Component
@Order(1) // Run before other filters
public class TenantFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(TenantFilter.class);

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        try {
            // Get customerId from request attributes (set by JwtAuthenticationFilter)
            Object customerId = request.getAttribute("customerId");
            
            if (customerId != null) {
                // Set tenant ID in thread local context
                TenantContext.setCurrentTenant(Long.valueOf(customerId.toString()));
                logger.debug("Set tenant context: {}", customerId);
            } else {
                // Clear tenant context if no customer ID found
                TenantContext.clear();
            }
            
            filterChain.doFilter(request, response);
        } finally {
            // Always clear the tenant context after the request
            TenantContext.clear();
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Skip tenant filtering for public paths
        return path.startsWith("/api/auth/") || 
               path.startsWith("/api/public/") || 
               path.startsWith("/v3/api-docs") || 
               path.startsWith("/swagger-ui");
    }
}
