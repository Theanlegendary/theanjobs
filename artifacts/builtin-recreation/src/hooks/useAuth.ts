/**
 * React Query hooks for Authentication
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { authService, type LoginCredentials, type RegisterData } from '@/services/auth.service';
import { queryKeys } from '@/lib/query-client';
import { toast } from 'sonner';

export function useAuth() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Get current user
  const { data: user, isLoading, error } = useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: () => authService.getCurrentUser(),
    enabled: authService.isAuthenticated(),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.user(), data.user);
      toast.success(`Welcome back, ${data.user.name}!`);
      setLocation('/');
    },
    onError: (error: any) => {
      toast.error('Login failed', {
        description: error.message || 'Invalid email or password',
      });
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.user(), data.user);
      toast.success(`Welcome, ${data.user.name}!`, {
        description: 'Your account has been created successfully',
      });
      setLocation('/');
    },
    onError: (error: any) => {
      toast.error('Registration failed', {
        description: error.message || 'Please try again',
      });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.user(), null);
      queryClient.clear(); // Clear all cached data
      toast.success('Logged out successfully');
      setLocation('/');
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof authService.updateProfile>[0]) =>
      authService.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.auth.user(), updatedUser);
      toast.success('Profile updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to change password', {
        description: error.message,
      });
    },
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset(email),
    onSuccess: () => {
      toast.success('Password reset email sent', {
        description: 'Check your inbox for further instructions',
      });
    },
    onError: () => {
      toast.error('Failed to send reset email');
    },
  });
}
