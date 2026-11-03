/**
 * Articles API Service
 * Handles all article/news content API calls
 */

import { api } from '@/lib/api-client';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'editor' | 'company' | 'expert';
  categoryLabel: string;
  topicTag: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    companyName?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  viewsCount: number;
  featured?: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ArticleFilters {
  search?: string;
  category?: string;
  topic?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'recent' | 'popular' | 'trending';
}

export const articlesService = {
  // Get all articles with filters
  async getArticles(filters?: ArticleFilters): Promise<ArticlesResponse> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.topic) params.append('topic', filters.topic);
    if (filters?.page) params.append('page', String(filters.page));
    if (filters?.pageSize) params.append('pageSize', String(filters.pageSize));
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const query = params.toString();
    return api.get<ArticlesResponse>(`/articles${query ? `?${query}` : ''}`);
  },

  // Get single article by ID or slug
  async getArticle(idOrSlug: string): Promise<Article> {
    return api.get<Article>(`/articles/${idOrSlug}`);
  },

  // Get related articles
  async getRelatedArticles(articleId: string, limit = 3): Promise<Article[]> {
    return api.get<Article[]>(`/articles/${articleId}/related?limit=${limit}`);
  },

  // Get trending articles
  async getTrendingArticles(limit = 5): Promise<Article[]> {
    return api.get<Article[]>(`/articles/trending?limit=${limit}`);
  },

  // Bookmark an article
  async bookmarkArticle(articleId: string): Promise<{ success: boolean }> {
    return api.post(`/articles/${articleId}/bookmark`);
  },

  // Remove bookmark
  async unbookmarkArticle(articleId: string): Promise<{ success: boolean }> {
    return api.delete(`/articles/${articleId}/bookmark`);
  },

  // Get bookmarked articles
  async getBookmarkedArticles(): Promise<Article[]> {
    return api.get<Article[]>('/articles/bookmarked');
  },

  // Track article view
  async trackView(articleId: string): Promise<void> {
    await api.post(`/articles/${articleId}/view`, {}, { skipAuth: true });
  },
};
