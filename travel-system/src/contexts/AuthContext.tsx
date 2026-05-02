import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../lib/authService';
import { authService } from '../lib/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 初始化时检查用户状态
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkUser();

    // 监听认证状态变化
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user, error } = await authService.signIn(email, password);
    if (error) {
      return { success: false, error };
    }
    setUser(user);
    return { success: true };
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { user, error } = await authService.signUp(email, password, username);
    if (error) {
      return { success: false, error };
    }
    setUser(user);
    return { success: true };
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    const { user, error } = await authService.updateProfile(updates);
    if (error) {
      return { success: false, error };
    }
    setUser(user);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}