/**
 * Companies API Service
 * Handles all company-related API calls
 */

import { api } from '@/lib/api-client';

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  industry: string;
  location: string;
  workPolicy: 'Hybrid' | 'Remote' | 'On-site';
  employeeCount: string;
  founded?: string;
  website?: string;
  description: string;
  techStack?: string[];
  benefits?: string[];
  culture?: string;
  openJobsCount: number;
  verified?: boolean;
}

export interface CompaniesResponse {
  companies: Company[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CompanyFilters {
  search?: string;
  industry?: string;
  location?: string;
  workPolicy?: string;
  size?: string;
  page?: number;
  pageSize?: number;
}

export const companiesService = {
  // Get all companies with filters
  async getCompanies(filters?: CompanyFilters): Promise<CompaniesResponse> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.industry) params.append('industry', filters.industry);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.workPolicy) params.append('workPolicy', filters.workPolicy);
    if (filters?.size) params.append('size', filters.size);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.pageSize) params.append('pageSize', String(filters.pageSize));

    const query = params.toString();
    return api.get<CompaniesResponse>(`/companies${query ? `?${query}` : ''}`);
  },

  // Get single company by ID or slug
  async getCompany(idOrSlug: string): Promise<Company> {
    return api.get<Company>(`/companies/${idOrSlug}`);
  },

  // Get company jobs
  async getCompanyJobs(companyId: string): Promise<any[]> {
    return api.get<any[]>(`/companies/${companyId}/jobs`);
  },

  // Follow a company
  async followCompany(companyId: string): Promise<{ success: boolean }> {
    return api.post(`/companies/${companyId}/follow`);
  },

  // Unfollow a company
  async unfollowCompany(companyId: string): Promise<{ success: boolean }> {
    return api.delete(`/companies/${companyId}/follow`);
  },

  // Get followed companies
  async getFollowedCompanies(): Promise<Company[]> {
    return api.get<Company[]>('/companies/followed');
  },
};
