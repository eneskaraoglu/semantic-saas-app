# Semantic SaaS App

A multi-tenant SaaS application with modular architecture for stock management, production, and reporting.

## Project Structure

- `backend/`: Spring Boot application with JWT auth and multi-tenancy
- `frontend/`: Vite + React application with TypeScript and Tailwind CSS
- `docker/`: Docker configuration files

## Prerequisites

- Java 17+
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (or use Docker version)

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd semantic-saas-app
```

### Setup Environment Variables

Create a `.env` file in the root directory:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=semantic_saas
JWT_SECRET=your_secret_key_here
```

### Start the Application with Docker Compose

The easiest way to start the entire application stack:

```bash
docker-compose up
```

This will start PostgreSQL, the backend, and the frontend.

### Manual Development Setup

#### Backend (Spring Boot)

```bash
cd backend
./gradlew bootRun
```

The backend will be available at http://localhost:8080

#### Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

## Implemented Features

- [x] Multi-tenant architecture with customer isolation
- [x] JWT-based authentication
- [x] Role-based access control (RBAC)
- [x] Responsive UI with Tailwind CSS
- [x] Dark/Light theme support
- [ ] User management module
- [ ] Stock management module
- [ ] Production module
- [ ] Reporting module

## API Documentation

Backend API is available at http://localhost:8080/api

### Authentication

- POST `/api/auth/login`: Authenticates a user and returns a JWT token
- POST `/api/auth/register`: Creates a new customer and admin user

## Contributing

1. Follow the project structure and coding conventions
2. Add tests for new features
3. Update documentation as needed
4. Create a pull request with a clear description of changes

## License

This project is licensed under the MIT License - see the LICENSE file for details.
