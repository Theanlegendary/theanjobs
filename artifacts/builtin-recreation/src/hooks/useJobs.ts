/**
 * React Query hooks for Jobs
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsService, type JobFilters, type JobApplication } from '@/services/jobs.service';
import { queryKeys } from '@/lib/query-client';
import { toast } from 'sonner';

export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: queryKeys.jobs.list(filters || {}),
    queryFn: () => jobsService.getJobs(filters),
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => jobsService.getJob(id),
    enabled: !!id,
  });
}

export function useSavedJobs() {
  return useQuery({
    queryKey: queryKeys.jobs.saved(),
    queryFn: () => jobsService.getSavedJobs(),
  });
}

export function useApplyToJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (application: JobApplication) => jobsService.applyToJob(application),
    onSuccess: (data) => {
      toast.success('Application submitted successfully!', {
        description: `Application ID: ${data.applicationId}`,
      });
      // Optionally invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
    onError: (error: any) => {
      toast.error('Failed to submit application', {
        description: error.message || 'Please try again later',
      });
    },
  });
}

export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobsService.saveJob(jobId),
    onSuccess: () => {
      toast.success('Job saved to your list');
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.saved() });
    },
    onError: () => {
      toast.error('Failed to save job');
    },
  });
}

export function useUnsaveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobsService.unsaveJob(jobId),
    onSuccess: () => {
      toast.success('Job removed from your list');
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.saved() });
    },
    onError: () => {
      toast.error('Failed to remove job');
    },
  });
}
