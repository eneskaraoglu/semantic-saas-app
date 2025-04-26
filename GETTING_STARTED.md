# Getting Started with Semantic SaaS App

This guide will help you start developing with this project.

## Development Workflow

### Backend Development

1. **Setup Database**
   
   Run PostgreSQL using Docker:
   ```bash
   docker-compose up postgres
   ```

2. **Start the Backend in Development Mode**
   
   ```bash
   cd backend
   ./gradlew bootRun
   ```

3. **Access API Documentation**
   
   Once running, you can view the API documentation at:
   http://localhost:8080/swagger-ui.html

### Frontend Development

1. **Install Dependencies**
   
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   
   ```bash
   npm run dev
   ```

3. **Accessing the Application**
   
   The application will be available at http://localhost:3000

## Next Steps in Development

According to the project checklist, follow these steps to continue development:

1. **Complete Backend Auth Implementation**
   - Implement JWT token generation and validation
   - Create repository layers for User, Customer, and Role entities
   - Implement service layer with business logic

2. **Implement Tenant Isolation**
   - Add filters to automatically apply customer/tenant ID to queries
   - Ensure proper data isolation between tenants

3. **Develop Core Modules**
   - Implement stock management features
   - Create production module
   - Build reporting functionality

4. **Enhance Frontend**
   - Complete authentication flow with API integration
   - Build user management screens
   - Implement proper error handling and loading states

## Testing

### Backend Testing

```bash
cd backend
./gradlew test
```

### Frontend Testing

```bash
cd frontend
npm run test
```

## Deployment

### Building for Production

```bash
# Build backend
cd backend
./gradlew build

# Build frontend
cd frontend
npm run build
```

### Deploying with Docker

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Additional Resources

- Spring Boot: https://spring.io/projects/spring-boot
- React: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/
