import { create } from 'zustand';
import { User, userService } from '../../services/userService';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: (customerId?: number) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (id: number, user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setCurrentUser: (user: User | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  fetchUsers: async (customerId?: number) => {
    try {
      set({ loading: true, error: null });
      const users = customerId 
        ? await userService.getUsersByCustomer(customerId)
        : await userService.getAllUsers();
      set({ users, loading: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch users' 
      });
    }
  },

  fetchUserById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const user = await userService.getUserById(id);
      set({ currentUser: user, loading: false });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch user' 
      });
    }
  },

  createUser: async (user: User) => {
    try {
      set({ loading: true, error: null });
      const createdUser = await userService.createUser(user);
      set(state => ({ 
        users: [...state.users, createdUser],
        loading: false 
      }));
    } catch (error) {
      console.error('Error creating user:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to create user' 
      });
    }
  },

  updateUser: async (id: number, user: User) => {
    try {
      set({ loading: true, error: null });
      const updatedUser = await userService.updateUser(id, user);
      set(state => ({
        users: state.users.map(u => u.id === id ? updatedUser : u),
        currentUser: state.currentUser?.id === id ? updatedUser : state.currentUser,
        loading: false
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to update user'
      });
    }
  },

  deleteUser: async (id: number) => {
    try {
      set({ loading: true, error: null });
      await userService.deleteUser(id);
      set(state => ({
        users: state.users.filter(user => user.id !== id),
        currentUser: state.currentUser?.id === id ? null : state.currentUser,
        loading: false
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete user'
      });
    }
  },

  setCurrentUser: (user: User | null) => {
    set({ currentUser: user });
  },

  clearError: () => {
    set({ error: null });
  }
}));
