<<<<<<< HEAD
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  institution: string;
=======
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  token: string;
>>>>>>> 52b4931 (feat: implement full-stack JWT auth, MongoDB integration, and AI analysis engine)
}

interface AuthContextType {
  user: User | null;
<<<<<<< HEAD
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  institution: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setUser({
      name: "Dr. Sarah Chen",
      email,
      role: "Clinical Genomics",
      institution: "Mayo Clinic",
    });
    return true;
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setUser({
      name: data.fullName,
      email: data.email,
      role: data.role,
      institution: data.institution,
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
=======
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('pharmaguard_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    setUser(response.data);
    localStorage.setItem('pharmaguard_user', JSON.stringify(response.data));
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    setUser(response.data);
    localStorage.setItem('pharmaguard_user', JSON.stringify(response.data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmaguard_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
>>>>>>> 52b4931 (feat: implement full-stack JWT auth, MongoDB integration, and AI analysis engine)
