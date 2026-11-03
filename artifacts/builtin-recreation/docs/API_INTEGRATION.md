# API Integration Guide

## Overview

This document describes how to integrate the Sandbox frontend with a backend API.

## Architecture

```
Frontend (React) → API Client → Backend API → Database
```

### Key Components

1. **API Client** (`src/lib/api-client.ts`)
   - Centralized HTTP client with authentication
   - Automatic token management
   - Error handling and timeouts
   - Request/response interceptors

2. **Service Modules** (`src/services/`)
   - `jobs.service.ts` - Job listings and applications
   - `companies.service.ts` - Company profiles
   - `articles.service.ts` - News and content
   - `auth.service.ts` - Authentication and user management

3. **React Query Hooks** (`src/hooks/`)
   - Data fetching with caching
   - Optimistic updates
   - Background refetching
   - Error handling

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Configure API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

## Backend API Requirements

### Authentication

**Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/password-reset/request` - Request password reset
- `POST /api/auth/password-reset/confirm` - Confirm password reset

**JWT Token Format:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "candidate"
  }
}
```

### Jobs API

**Endpoints:**
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/apply` - Apply to a job (multipart/form-data)
- `POST /api/jobs/:id/save` - Save/bookmark job
- `DELETE /api/jobs/:id/save` - Remove saved job
- `GET /api/jobs/saved` - Get user's saved jobs

**Query Parameters:**
- `search` - Search query
- `location` - Location filter
- `type` - Job type (Full-time, Part-time, etc.)
- `remote` - Boolean for remote jobs
- `salaryMin`, `salaryMax` - Salary range
- `page`, `pageSize` - Pagination
- `sortBy` - Sort order (recent, salary, relevance)

**Response Format:**
```json
{
  "jobs": [...],
  "total": 250,
  "page": 1,
  "pageSize": 20,
  "hasMore": true
}
```

### Companies API

**Endpoints:**
- `GET /api/companies` - List companies with filters
- `GET /api/companies/:id` - Get company details
- `GET /api/companies/:id/jobs` - Get company's job listings
- `POST /api/companies/:id/follow` - Follow company
- `DELETE /api/companies/:id/follow` - Unfollow company
- `GET /api/companies/followed` - Get followed companies

### Articles API

**Endpoints:**
- `GET /api/articles` - List articles with filters
- `GET /api/articles/:id` - Get article details
- `GET /api/articles/:id/related` - Get related articles
- `GET /api/articles/trending` - Get trending articles
- `POST /api/articles/:id/bookmark` - Bookmark article
- `DELETE /api/articles/:id/bookmark` - Remove bookmark
- `POST /api/articles/:id/view` - Track article view

## Usage Examples

### Fetching Jobs

```tsx
import { useJobs } from '@/hooks/useJobs';

function JobsList() {
  const { data, isLoading, error } = useJobs({
    search: 'software engineer',
    location: 'San Francisco',
    page: 1,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <div>
      {data?.jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
```

### Applying to Jobs

```tsx
import { useApplyToJob } from '@/hooks/useJobs';

function ApplyButton({ jobId }: { jobId: string }) {
  const { mutate: apply, isPending } = useApplyToJob();

  const handleApply = () => {
    apply({
      jobId,
      candidateName: 'John Doe',
      candidateEmail: 'john@example.com',
      resume: resumeFile,
      coverLetter: 'I am interested...',
    });
  };

  return (
    <button onClick={handleApply} disabled={isPending}>
      {isPending ? 'Submitting...' : 'Apply Now'}
    </button>
  );
}
```

### Authentication

```tsx
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button disabled={isLoggingIn}>Login</button>
    </form>
  );
}
```

## Error Handling

All API errors are caught and handled consistently:

```tsx
try {
  const data = await api.get('/endpoint');
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.status);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
  }
}
```

## Testing

### Mock API for Development

Create a mock server or use MSW (Mock Service Worker):

```bash
npm install -D msw
```

See `docs/TESTING.md` for full testing guide.

## Production Deployment

1. Set production environment variables
2. Build the frontend: `npm run build`
3. Deploy to your hosting provider
4. Ensure CORS is configured on backend
5. Use HTTPS for all API calls

## Security Considerations

- Always use HTTPS in production
- Tokens are stored in localStorage (consider HttpOnly cookies for enhanced security)
- Implement rate limiting on backend
- Validate all user inputs
- Use CSRF tokens for state-changing operations
- Implement proper authentication middleware

## Performance Optimization

- React Query handles caching automatically
- Implement pagination for large datasets
- Use CDN for static assets
- Enable gzip/brotli compression
- Consider implementing GraphQL for complex queries

## Support

For issues or questions:
- Check the [API documentation](./API_REFERENCE.md)
- Review [troubleshooting guide](./TROUBLESHOOTING.md)
- Open an issue on GitHub
