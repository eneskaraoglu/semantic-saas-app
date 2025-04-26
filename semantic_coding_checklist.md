
# ✅ Semantic Coding Checklist for SaaS App

This checklist aligns with the architecture summary and is designed to help track key implementation tasks during development.

---

## 📁 Project Setup
- [ ] Initialize Git repository
- [ ] Setup project structure for frontend and backend
- [ ] Create Docker and Docker Compose configuration
- [ ] Configure `.env` files for dev environments

---

## 🔐 Backend: Auth & User Management (Spring Boot)
- [ ] Set up Spring Boot project with PostgreSQL integration
- [ ] Create entities: Customer, User, Role, UserRole
- [ ] Implement repository and service layers
- [ ] Add database migrations with Flyway or Liquibase
- [ ] Implement JWT-based authentication with Spring Security
- [ ] Setup signup endpoint to create customer and admin user
- [ ] Create login endpoint returning JWT
- [ ] Implement role-based access control (RBAC)
- [ ] Extract customerId from JWT and apply to tenant-scoped queries
- [ ] Add global exception handling

---

## 🧩 Backend: Modular Services
- [ ] Create modules for stock, production, and reporting
- [ ] Ensure each module supports multi-tenancy with customerId filtering
- [ ] Implement CRUD APIs for each module

---

## ⚛️ Frontend Setup (Vite + React)
- [ ] Bootstrap project with Vite + React + TypeScript
- [ ] Integrate Tailwind CSS and configure dark mode
- [ ] Set up routing with React Router
- [ ] Implement folder-by-feature structure
- [ ] Create shared components (Layout, Navbar, Sidebar, etc.)

---

## 🌍 Frontend: Functionality & State
- [ ] Implement JWT auth handling (login, token storage)
- [ ] Add Zustand or React Query for state/data management
- [ ] Create signup page for customer and admin creation
- [ ] Create login page and auth context
- [ ] Implement user management screen (create user, assign roles)
- [ ] Setup role-based route guards

---

## 🎨 Frontend: UI & UX
- [ ] Integrate i18n using react-i18next
- [ ] Add theme switch (light/dark mode)
- [ ] Ensure mobile responsiveness via Tailwind
- [ ] Add page-level loading states and error handling

---

## 🚀 Deployment
- [ ] Build and run all services with Docker Compose
- [ ] Set up basic CI/CD (GitHub Actions or similar)
- [ ] Deploy to hosting platform (Render, Railway, or Fly.io)

