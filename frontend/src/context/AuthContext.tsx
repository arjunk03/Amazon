import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User } from '../types/api';
import { mockUser } from '../mock/data';

/**
 * Auth: POST /api/auth/login, POST /api/auth/register. Mock user used when logged in.
 */
const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    setUser({ ...mockUser, email, name: email.split('@')[0] });
    setToken('placeholder-token');
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setUser({ ...mockUser, email, name });
    setToken('placeholder-token');
  }, []);

  const logout = useCallback(() => {
    // Optional: POST /api/auth/logout
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
