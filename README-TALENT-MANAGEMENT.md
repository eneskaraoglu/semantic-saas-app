# Talent Management Module

This document provides an overview of the Talent Management module implemented for the Semantic SaaS Application.

## Features

The Talent Management module offers CRUD (Create, Read, Update, Delete) operations for managing talent profiles within the system. This functionality is restricted to users with the ADMIN role.

### Key Features:

1. **View Talent List**: Browse all talents with pagination, sorting, and search capabilities.
2. **Create Talents**: Add new talent profiles with comprehensive details.
3. **View Talent Details**: See in-depth information about each talent.
4. **Edit Talents**: Update talent information as needed.
5. **Delete Talents**: Remove talent profiles from the system.

## Implementation Details

### Backend Components:

1. **Model**: `Talent.java` - Entity class representing talent information.
2. **Repository**: `TalentRepository.java` - Data access layer with custom queries.
3. **Service**: `TalentService.java` - Business logic layer for talent operations.
4. **Controller**: `TalentController.java` - REST API endpoints with role-based security.
5. **DTO**: `TalentDTO.java` - Data Transfer Object for talent data.
6. **Database**: Migration script `V3__Create_Talents_Table.sql` to create the talents table.

### Frontend Components:

1. **Service**: `talentService.ts` - API client for interacting with the backend.
2. **Components**:
   - `TalentList.tsx` - Main component for displaying and searching talents.
   - `TalentForm.tsx` - Form for creating and editing talents.
   - `TalentDetail.tsx` - Detailed view of a talent profile.
3. **Navigation**: Updated sidebar to include Talent Management link for admin users.
4. **Routing**: Added routes for talent management in `App.tsx`.

## Security

Access to the Talent Management module is restricted at multiple levels:

1. **Frontend Route Protection**: Admin-only routes are protected by `ProtectedRoute` component.
2. **Backend Method Security**: `@PreAuthorize("hasRole('ROLE_ADMIN')")` annotations on controller methods.
3. **Service Layer Validation**: Customer ID validation ensures multi-tenant security.

## Usage

To access Talent Management features:

1. Log in with an account that has the `ROLE_ADMIN` role.
2. Navigate to the "Talent Management" link in the sidebar menu.
3. From there, you can view, search, add, edit, and delete talent profiles.

## Data Model

The Talent entity contains the following information:

- Basic details (name, email, phone, location)
- Professional information (skills, experience, education)
- Career status (current position, desired position, salary expectations)
- Online profiles (LinkedIn, GitHub, portfolio, resume)
- Administrative data (notes, creation date, update date)

## Multi-tenancy

The talent management system respects the multi-tenant architecture of the application:

- Each talent record is associated with a specific customer.
- Users can only access talent data from their own customer/organization.
- Database queries are filtered by customer ID for data isolation.

## Screenshots

(Add screenshots of the talent management interface here)

## Future Enhancements

Potential enhancements for future releases:

1. Talent tagging and categorization
2. Advanced search and filtering options
3. File uploads for resumes and portfolios
4. Integration with calendar for scheduling interviews
5. Automated skill matching with job requirements
