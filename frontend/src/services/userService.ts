import { api } from './api';

export interface User {
  id?: number;
  customerId: number;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
  roles: string[];
}

const API_ENDPOINT = '/users';

export const userService = {
  /**
   * Get all users
   * @returns Promise with list of users
   */
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get(API_ENDPOINT);
    return response.data;
  },

  /**
   * Get users by customer ID
   * @param customerId The customer ID
   * @returns Promise with list of users
   */
  getUsersByCustomer: async (customerId: number): Promise<User[]> => {
    const response = await api.get(`${API_ENDPOINT}/customer/${customerId}`);
    return response.data;
  },

  /**
   * Get user by ID
   * @param id The user ID
   * @returns Promise with user data
   */
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`${API_ENDPOINT}/${id}`);
    return response.data;
  },

  /**
   * Create a new user
   * @param user The user data
   * @returns Promise with created user
   */
  createUser: async (user: User): Promise<User> => {
    const response = await api.post(API_ENDPOINT, user);
    return response.data;
  },

  /**
   * Update an existing user
   * @param id The user ID
   * @param user The updated user data
   * @returns Promise with updated user
   */
  updateUser: async (id: number, user: User): Promise<User> => {
    const response = await api.put(`${API_ENDPOINT}/${id}`, user);
    return response.data;
  },

  /**
   * Delete a user
   * @param id The user ID
   * @returns Promise
   */
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`${API_ENDPOINT}/${id}`);
  }
};
