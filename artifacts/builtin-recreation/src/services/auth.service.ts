/**
 * Authentication API Service
 * Handles user authentication and session management
 */

import { api } from '@/lib/api-client';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'candidate' | 'employer' | 'admin';
  profile?: {
    title?: string;
    location?: string;
    bio?: string;
    skills?: string[];
    experience?: string;
    education?: string;
  };
  createdAt: string;
  emailVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'candidate' | 'employer';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials, {
      skipAuth: true,
    });
    
    // Store token
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  // Register
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data, {
      skipAuth: true,
    });
    
    // Store token
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    return api.get<User>('/auth/me');
  },

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post<AuthResponse>(
      '/auth/refresh',
      { refreshToken },
      { skipAuth: true }
    );

    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    
    return response;
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    return api.post('/auth/password-reset/request', { email }, { skipAuth: true });
  },

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
    return api.post('/auth/password-reset/confirm', { token, newPassword }, { skipAuth: true });
  },

  // Verify email
  async verifyEmail(token: string): Promise<{ success: boolean }> {
    return api.post('/auth/verify-email', { token }, { skipAuth: true });
  },

  // Resend verification email
  async resendVerificationEmail(): Promise<{ success: boolean }> {
    return api.post('/auth/verify-email/resend');
  },

  // Update profile
  async updateProfile(data: Partial<User['profile']>): Promise<User> {
    return api.patch<User>('/auth/profile', data);
  },

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    return api.post('/auth/change-password', { currentPassword, newPassword });
  },

  // Check if user is authenticated (client-side check)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  // Get stored user (client-side)
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};
