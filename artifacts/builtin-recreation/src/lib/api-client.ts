/**
 * API Client for Sandbox Platform
 * 
 * Centralized API communication layer with:
 * - Authentication token management
 * - Request/response interceptors
 * - Error handling
 * - Type safety
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 30000; // 30 seconds

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
}

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, skipAuth = false, ...fetchOptions } = options;

    const headers = new Headers(fetchOptions.headers);
    
    // Add auth token if available and not skipped
    if (!skipAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }

    // Always set content type for POST/PUT/PATCH
    if (['POST', 'PUT', 'PATCH'].includes(fetchOptions.method || '')) {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT');
      }
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      throw new ApiError('Failed to parse response', response.status, 'PARSE_ERROR');
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || data?.error || 'Request failed',
        response.status,
        data?.code,
        data?.details
      );
    }

    return data as T;
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'GET',
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await this.fetchWithTimeout(url, {
      ...options,
      method: 'DELETE',
    });
    return this.handleResponse<T>(response);
  }

  async upload<T>(
    endpoint: string,
    formData: FormData,
    options?: RequestOptions
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const { headers, ...restOptions } = options || {};
    
    // Don't set Content-Type for FormData - browser will set it with boundary
    const response = await this.fetchWithTimeout(url, {
      ...restOptions,
      method: 'POST',
      body: formData,
      headers: headers ? new Headers(headers) : undefined,
    });
    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export convenience methods
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    apiClient.get<T>(endpoint, options),
  
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    apiClient.post<T>(endpoint, body, options),
  
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    apiClient.put<T>(endpoint, body, options),
  
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    apiClient.patch<T>(endpoint, body, options),
  
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    apiClient.delete<T>(endpoint, options),
  
  upload: <T>(endpoint: string, formData: FormData, options?: RequestOptions) => 
    apiClient.upload<T>(endpoint, formData, options),
};
