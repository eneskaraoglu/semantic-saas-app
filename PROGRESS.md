# ✅ Semantic Coding Progress

This file tracks our progress against the original checklist.

---

## 📁 Project Setup
- [x] Initialize Git repository
- [x] Setup project structure for frontend and backend
- [x] Create Docker and Docker Compose configuration
- [x] Configure `.env` files for dev environments

---

## 🔐 Backend: Auth & User Management (Spring Boot)
- [x] Set up Spring Boot project with PostgreSQL integration
- [x] Create entities: Customer, User, Role, UserRole
- [ ] Implement repository and service layers
- [x] Add database migrations with Flyway
- [ ] Implement JWT-based authentication with Spring Security
- [x] Setup signup endpoint to create customer and admin user (skeleton)
- [x] Create login endpoint returning JWT (skeleton)
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
- [x] Bootstrap project with Vite + React + TypeScript
- [x] Integrate Tailwind CSS and configure dark mode
- [x] Set up routing with React Router
- [x] Implement folder-by-feature structure
- [x] Create shared components (Layout, Navbar, Sidebar, etc.)

---

## 🌍 Frontend: Functionality & State
- [x] Implement JWT auth handling (login, token storage)
- [x] Add Zustand for state management
- [x] Create signup page for customer and admin creation
- [x] Create login page and auth context
- [ ] Implement user management screen (create user, assign roles)
- [x] Setup role-based route guards

---

## 🎨 Frontend: UI & UX
- [ ] Integrate i18n using react-i18next
- [x] Add theme switch (light/dark mode)
- [x] Ensure mobile responsiveness via Tailwind
- [x] Add page-level loading states and error handling

---

## 🚀 Deployment
- [x] Build and run all services with Docker Compose
- [ ] Set up basic CI/CD (GitHub Actions or similar)
- [ ] Deploy to hosting platform (Render, Railway, or Fly.io)

