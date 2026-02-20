import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Pulls the Render URL from your Netlify Environment Variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Persistence: Check if user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('pharmaguard_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Auth: Failed to parse stored user session", error);
        localStorage.removeItem('pharmaguard_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      const userData = response.data;
      
      setUser(userData);
      localStorage.setItem('pharmaguard_user', JSON.stringify(userData));
    } catch (error: any) {
      console.error("Auth: Login failed", error.response?.data?.message || error.message);
      throw error; // Rethrow so the UI can show an error message
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('pharmaguard_user', JSON.stringify(userData));
    } catch (error: any) {
      console.error("Auth: Registration failed", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmaguard_user');
    // Optional: redirect to login page
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};