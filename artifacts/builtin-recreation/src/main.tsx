import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { QueryProvider } from '@/lib/query-client';
import { ToastProvider } from '@/components/ToastProvider';
import { analytics } from '@/lib/analytics';

import './index.css';

// Initialize analytics
analytics.init();

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <HelmetProvider>
      <QueryProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryProvider>
    </HelmetProvider>
  </ErrorBoundary>,
);
