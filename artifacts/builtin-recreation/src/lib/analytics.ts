/**
 * Analytics Integration
 * Supports Google Analytics, PostHog, and custom tracking
 */

// Analytics configuration
const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const ANALYTICS_ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

// Event types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

class Analytics {
  private initialized = false;

  // Initialize analytics services
  init() {
    if (!ANALYTICS_ENABLED || this.initialized) return;

    // Google Analytics 4
    if (GA_ID) {
      this.initGA4();
    }

    // PostHog (open-source alternative)
    if (POSTHOG_KEY) {
      this.initPostHog();
    }

    this.initialized = true;
    console.log('Analytics initialized');
  }

  private initGA4() {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, {
      send_page_view: false, // We'll handle page views manually
    });
  }

  private initPostHog() {
    // PostHog integration would go here
    // See: https://posthog.com/docs/integrate/client/js
  }

  // Track page views
  pageView(path: string, title?: string) {
    if (!ANALYTICS_ENABLED) return;

    // Google Analytics
    if (GA_ID && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title,
      });
    }

    // Custom tracking
    this.customEvent({
      action: 'page_view',
      category: 'Navigation',
      label: path,
    });
  }

  // Track custom events
  event(event: AnalyticsEvent) {
    if (!ANALYTICS_ENABLED) return;

    // Google Analytics
    if (GA_ID && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event,
      });
    }

    // Custom tracking
    this.customEvent(event);
  }

  // Track user identification
  identify(userId: string, traits?: Record<string, any>) {
    if (!ANALYTICS_ENABLED) return;

    // Google Analytics
    if (GA_ID && (window as any).gtag) {
      (window as any).gtag('config', GA_ID, {
        user_id: userId,
      });
    }

    console.log('User identified:', userId, traits);
  }

  // Custom event tracking (can be sent to your own backend)
  private customEvent(event: AnalyticsEvent) {
    // Send to your own analytics endpoint
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/events', blob);
    }
  }
}

// Export singleton
export const analytics = new Analytics();

// Convenience functions
export const trackPageView = (path: string, title?: string) => analytics.pageView(path, title);
export const trackEvent = (event: AnalyticsEvent) => analytics.event(event);
export const identifyUser = (userId: string, traits?: Record<string, any>) => analytics.identify(userId, traits);

// Predefined event trackers
export const trackJobView = (jobId: string, jobTitle: string) => {
  trackEvent({
    action: 'view_job',
    category: 'Jobs',
    label: jobTitle,
    value: 1,
    job_id: jobId,
  });
};

export const trackJobApplication = (jobId: string, jobTitle: string) => {
  trackEvent({
    action: 'apply_job',
    category: 'Conversions',
    label: jobTitle,
    value: 1,
    job_id: jobId,
  });
};

export const trackCompanyView = (companyId: string, companyName: string) => {
  trackEvent({
    action: 'view_company',
    category: 'Companies',
    label: companyName,
    company_id: companyId,
  });
};

export const trackSearch = (query: string, resultCount: number) => {
  trackEvent({
    action: 'search',
    category: 'Search',
    label: query,
    value: resultCount,
  });
};

export const trackSignup = (method: 'email' | 'google' | 'linkedin') => {
  trackEvent({
    action: 'sign_up',
    category: 'Auth',
    label: method,
    value: 1,
  });
};

export const trackLogin = (method: 'email' | 'google' | 'linkedin') => {
  trackEvent({
    action: 'login',
    category: 'Auth',
    label: method,
  });
};
