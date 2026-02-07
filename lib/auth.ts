// Authentication utilities
export interface User {
  id: string;
  name: string;
  email: string;
}

const STORAGE_KEY = 'ecommerce_user';

export const auth = {
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  signup: (name: string, email: string, password: string): User => {
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  login: (email: string, password: string): User | null => {
    // Mock login - in real app would verify against backend
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name: email.split('@')[0],
      email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(STORAGE_KEY);
  },
};
