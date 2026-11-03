/**
 * Jobs API Service
 * Handles all job-related API calls
 */

import { api } from '@/lib/api-client';

export interface Job {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Remote';
  workPolicy: 'Hybrid' | 'Remote' | 'On-site';
  salary: string;
  salaryPeriod: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  postedAt: string;
  expiresAt?: string;
  applicationUrl?: string;
  featured?: boolean;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  pageSize?: number;
  sortBy?: 'recent' | 'salary' | 'relevance';
}

export interface JobApplication {
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  resume: File | string;
  coverLetter?: string;
}

export const jobsService = {
  // Get all jobs with filters
  async getJobs(filters?: JobFilters): Promise<JobsResponse> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.remote !== undefined) params.append('remote', String(filters.remote));
    if (filters?.salaryMin) params.append('salaryMin', String(filters.salaryMin));
    if (filters?.salaryMax) params.append('salaryMax', String(filters.salaryMax));
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.pageSize) params.append('pageSize', String(filters.pageSize));
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const query = params.toString();
    return api.get<JobsResponse>(`/jobs${query ? `?${query}` : ''}`);
  },

  // Get single job by ID
  async getJob(id: string): Promise<Job> {
    return api.get<Job>(`/jobs/${id}`);
  },

  // Search jobs
  async searchJobs(query: string): Promise<JobsResponse> {
    return api.get<JobsResponse>(`/jobs/search?q=${encodeURIComponent(query)}`);
  },

  // Apply to a job
  async applyToJob(application: JobApplication): Promise<{ success: boolean; applicationId: string }> {
    const formData = new FormData();
    formData.append('jobId', application.jobId);
    formData.append('candidateName', application.candidateName);
    formData.append('candidateEmail', application.candidateEmail);
    if (application.candidatePhone) {
      formData.append('candidatePhone', application.candidatePhone);
    }
    if (application.resume instanceof File) {
      formData.append('resume', application.resume);
    }
    if (application.coverLetter) {
      formData.append('coverLetter', application.coverLetter);
    }

    return api.upload(`/jobs/${application.jobId}/apply`, formData);
  },

  // Save/bookmark a job
  async saveJob(jobId: string): Promise<{ success: boolean }> {
    return api.post(`/jobs/${jobId}/save`);
  },

  // Unsave a job
  async unsaveJob(jobId: string): Promise<{ success: boolean }> {
    return api.delete(`/jobs/${jobId}/save`);
  },

  // Get saved jobs
  async getSavedJobs(): Promise<Job[]> {
    return api.get<Job[]>('/jobs/saved');
  },

  // Report a job
  async reportJob(jobId: string, reason: string): Promise<{ success: boolean }> {
    return api.post(`/jobs/${jobId}/report`, { reason });
  },
};
