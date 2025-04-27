import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from './userStore';
import { User } from '../../services/userService';

// This component will be used for both creating and editing users
const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new';
  const userId = isEditMode ? parseInt(id!, 10) : undefined;
  
  const navigate = useNavigate();
  const { 
    currentUser, 
    loading, 
    error, 
    fetchUserById, 
    createUser, 
    updateUser,
    setCurrentUser,
    clearError
  } = useUserStore();

  // Form state
  const [formData, setFormData] = useState<User>({
    customerId: 1,  // Default value, might need to be set dynamically
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    enabled: true,
    roles: []
  });

  // Available roles (should be fetched from API in a real app)
  const availableRoles = ['ADMIN', 'MANAGER', 'USER'];

  // Load user data if in edit mode
  useEffect(() => {
    clearError();
    if (isEditMode && userId) {
      fetchUserById(userId);
    }
    
    return () => {
      // Cleanup
      setCurrentUser(null);
    };
  }, [isEditMode, userId, fetchUserById, clearError, setCurrentUser]);

  // Populate form when currentUser changes
  useEffect(() => {
    if (currentUser && isEditMode) {
      setFormData({
        ...currentUser,
        password: '' // Clear password field for security
      });
    }
  }, [currentUser, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return { ...prev, roles: [...prev.roles, value] };
      } else {
        return { ...prev, roles: prev.roles.filter(role => role !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode && userId) {
        await updateUser(userId, formData);
      } else {
        await createUser(formData);
      }
      navigate('/users');
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center py-10">Loading user data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit User' : 'Create New User'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* First Name */}
          <div>
            <label 
              htmlFor="firstName" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label 
              htmlFor="lastName" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password - only required in create mode */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {isEditMode ? 'Password (leave blank to keep current)' : 'Password*'}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Active/Inactive */}
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="enabled"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label 
              htmlFor="enabled" 
              className="ml-2 block text-sm text-gray-900"
            >
              Active Account
            </label>
          </div>
        </div>

        {/* Roles */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User Roles*
          </label>
          <div className="space-y-2">
            {availableRoles.map(role => (
              <div key={role} className="flex items-center">
                <input
                  type="checkbox"
                  id={`role-${role}`}
                  name="roles"
                  value={role}
                  checked={formData.roles.includes(role)}
                  onChange={handleRoleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label 
                  htmlFor={`role-${role}`} 
                  className="ml-2 block text-sm text-gray-900"
                >
                  {role}
                </label>
              </div>
            ))}
          </div>
          {formData.roles.length === 0 && (
            <p className="text-sm text-red-600 mt-1">At least one role is required</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || formData.roles.length === 0}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
