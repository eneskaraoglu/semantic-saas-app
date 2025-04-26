
# SaaS Web App Architecture Summary

## 🧭 Project Overview

You’re building a **SaaS web app** that includes features like **stock management, production, and reporting**. It should:
- Work on desktop and mobile browsers
- Be modular and scalable
- Be built from scratch
- Use **Spring Boot** for backend, **PostgreSQL** for database, **Docker** for deployment
- Be managed solo

---

## 🧱 Frontend Stack Decision

✅ **Chosen Stack**:
- **React (CSR)** + **Vite** for speed and simplicity
- **Tailwind CSS** for styling
- **Zustand** or **React Query** for state management
- **ShadCN UI** or **Radix UI** for components
- **File/folder by feature module** (e.g., `/modules/stock`, `/modules/reporting`)

📌 **Extras** to include:
- i18n with `react-i18next`
- Dark/Light theme support
- Route guards & auth handling with JWT

---

## 🔐 Backend Stack Design

✅ **Chosen Stack**:
- Spring Boot (Java)
- PostgreSQL (UUID primary keys)
- Spring Security + JWT (for authentication)
- Docker (with Docker Compose)
- Flyway or Liquibase (for DB migrations)

### 🎯 Modular Structure (Package by Feature):
```
src/
├── customer/
├── user/
├── role/
├── stock/
├── production/
├── config/
└── common/
```

---

## 🔑 Core Backend Entities

- **Customer**
- **User** (belongs to Customer)
- **Role** (e.g., ADMIN, USER)
- **UserRole** (join table for RBAC)

### ➕ Multi-Tenancy:
- Shared DB, `customer_id` column in tenant-specific tables
- Extract `customerId` from JWT token per request

---

## 📤 API Flow Summary

1. **/api/signup**  
   Creates a new Customer and initial Admin user.

2. **/api/auth/login**  
   Returns JWT (includes `userId`, `customerId`, and roles)

3. **/api/users** (Admin Only)  
   Creates new users under same `customerId` with role assignment.

---

## 🔒 JWT Payload Example
```json
{
  "sub": "user-id-123",
  "customerId": "cust-uuid-456",
  "roles": ["ADMIN"]
}
```

---

## ✅ Development Goals

| Feature                  | Status/Plan         |
|--------------------------|---------------------|
| Multi-Tenant Support     | ✅ Shared DB model   |
| RBAC                     | ✅ Role-based auth   |
| Secure Auth              | ✅ Spring Security + JWT |
| SaaS Signup Flow         | ✅ Customer + Admin creation |
| i18n + Theme Support     | ✅ In frontend plan  |
| Mobile Support           | ✅ Via Tailwind CSS  |
| Docker Deployment        | ✅ Planned           |
