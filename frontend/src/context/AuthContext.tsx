import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { User } from '../types/user';
import { usersApi } from '../services/api';
import { storage, STORAGE_KEYS } from '../utils';

/**
 * Auth context using production-ready service layer
 */
const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string, user_type?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => storage.get<User>(STORAGE_KEYS.USER));
  const [token, setToken] = useState<string | null>(() => storage.get<string>(STORAGE_KEYS.AUTH_TOKEN));

  const isAuthenticated = !!user && !!token;

  // Persist user and token to localStorage
  useEffect(() => {
    if (user) {
      storage.set(STORAGE_KEYS.USER, user);
    } else {
      storage.remove(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    } else {
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    }
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await usersApi.login({ email, password });
    setUser(response.user);
    setToken(response.token);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, phone?: string, user_type?: string) => {
    const response = await usersApi.register({
      username: name,
      email,
      password,
      phone: phone || null,
      user_type: user_type || null,
    });

    // After registration, create a user object and set a placeholder token
    const newUser: User = {
      id: response.id,
      username: response.username,
      email: response.email,
      name: response.username, // For backward compatibility
      user_type: response.user_type,
      phone: response.phone,
    };

    setUser(newUser);
    setToken('placeholder-token'); // In production, backend should return a token
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    storage.clear();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
