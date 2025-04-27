import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserList from './UserList';
import UserForm from './UserForm';

const UserManagement: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/new" element={<UserForm />} />
      <Route path="/edit/:id" element={<UserForm />} />
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  );
};

export default UserManagement;
