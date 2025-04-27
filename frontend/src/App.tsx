import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

// Lazy-loaded components
const Login = lazy(() => import('./features/auth/Login'));
const Register = lazy(() => import('./features/auth/Register'));
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const NotFound = lazy(() => import('./components/NotFound'));
const Unauthorized = lazy(() => import('./components/Unauthorized'));

// Talent management components
const TalentList = lazy(() => import('./features/talent/TalentList'));
const TalentForm = lazy(() => import('./features/talent/TalentForm'));
const TalentDetail = lazy(() => import('./features/talent/TalentDetail'));

// User management components
const UserManagement = lazy(() => import('./features/users/UserManagement'));

// Layout components
const AppLayout = lazy(() => import('./layouts/AppLayout'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Admin-only routes */}
                <Route element={<ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ADMIN']} />}>
                  {/* Talent Management Routes */}
                  <Route path="talents" element={<TalentList />} />
                  <Route path="talents/new" element={<TalentForm />} />
                  <Route path="talents/:id" element={<TalentDetail />} />
                  <Route path="talents/edit/:id" element={<TalentForm />} />
                  
                  {/* User Management Routes */}
                  <Route path="users/*" element={<UserManagement />} />
                </Route>
              </Route>
            </Route>
            
            {/* Error routes */}
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
