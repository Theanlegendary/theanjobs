# Component Showcase 🎨

## Visual Enhancement Components - Usage Examples

This document provides practical examples of how to use each visual enhancement component.

---

## 1. Particle Background

**Location**: Background of all pages  
**File**: `src/components/ParticlesBackground.tsx`

### Features
- Interactive particles that respond to mouse movement
- Canvas-based rendering for 60fps performance
- Automatic particle connections with proximity detection
- Optimized for all screen sizes

### Usage
Already integrated in `App.tsx` - no additional setup needed!

```tsx
<ParticlesBackground />
```

---

## 2. Scroll Progress

**Location**: Top of every page  
**File**: `src/components/ScrollProgress.tsx`

### Features
- Gradient progress bar (blue → purple → pink)
- Fixed position at top
- Updates as user scrolls
- Smooth transitions

### Usage
Already integrated in `App.tsx`:

```tsx
<ScrollProgress />
```

---

## 3. Floating Action Button (FAB)

**Location**: Bottom-right corner  
**File**: `src/components/FloatingActionButton.tsx`

### Features
- Expandable menu with 4 quick actions
- Smooth animations
- Icons for each action
- Always accessible

### Usage
Already integrated in `App.tsx`:

```tsx
<FloatingActionButton />
```

---

## 4. Back to Top Button

**Location**: Bottom-right (appears after scrolling)  
**File**: `src/components/BackToTop.tsx`

### Features
- Appears after 300px scroll
- Smooth scroll animation
- Fade in/out transitions
- Blue gradient with shadow

### Usage
Already integrated in `App.tsx`:

```tsx
<BackToTop />
```

---

## 5. Page Transitions

**File**: `src/components/PageTransition.tsx`

### Features
Multiple animation variants:
- `PageTransition`: Basic fade + slide
- `FadeIn`: Opacity with vertical slide
- `SlideIn`: Directional slide (left/right/up/down)
- `ScaleIn`: Scale transformation

### Usage Examples

#### Basic Page Transition
```tsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

#### Fade In with Delay
```tsx
<FadeIn delay={200}>
  <Section />
</FadeIn>
```

#### Slide In from Direction
```tsx
<SlideIn direction="left" delay={100}>
  <Card />
</SlideIn>
```

#### Scale In
```tsx
<ScaleIn delay={300}>
  <Feature />
</ScaleIn>
```

---

## 6. Enhanced Job Card

**File**: `src/components/EnhancedJobCard.tsx`

### Features
- Gradient border on hover
- Elevation changes
- Pulse animation for "Just posted"
- Featured badge
- Quick actions (bookmark, open)
- Remote indicator

### Usage
```tsx
<EnhancedJobCard
  job={{
    id: '123',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    salary: '$150K - $200K',
    type: 'Full-time',
    posted: 'Just posted',
    logo: '/images/google.png',
    tags: ['React', 'TypeScript', 'Node.js'],
    featured: true,
    remote: true,
  }}
/>
```

---

## 7. Skeleton Loading

**File**: `src/components/SkeletonCard.tsx`

### Features
- Three variants: job, company, article
- Shimmer animation
- Matches actual content layout
- Grid helper component

### Usage Examples

#### Single Skeleton
```tsx
<SkeletonCard type="job" />
<SkeletonCard type="company" />
<SkeletonCard type="article" />
```

#### Skeleton Grid
```tsx
{isLoading ? (
  <SkeletonGrid type="job" count={6} />
) : (
  <JobList jobs={jobs} />
)}
```

---

## 8. Live Search

**File**: `src/components/LiveSearch.tsx`

### Features
- Real-time search with debouncing
- Recent searches persistence
- Trending keywords
- Type badges (job/company/article)
- Dropdown with suggestions

### Usage
```tsx
<LiveSearch />
```

### Example in Header
```tsx
<header>
  <Logo />
  <LiveSearch />
  <Navigation />
</header>
```

---

## 9. Interactive Stats

**File**: `src/components/InteractiveStats.tsx`

### Features
- Animated counters (count up effect)
- Scroll-triggered animations
- Hover effects with glow
- Four predefined metrics
- Staggered entrance

### Usage
Already integrated in `Home.tsx`:

```tsx
<InteractiveStats />
```

### Custom Stats Version
```tsx
// Create your own variant with custom stats
const stats = [
  { icon: <Icon />, value: 1000, label: 'Users', color: 'from-blue-500 to-cyan-500' },
  // ... more stats
];
```

---

## 10. Toast Notifications

**File**: `src/components/ToastProvider.tsx`

### Features
- Four types: success, error, info, warning
- Auto-dismiss with custom duration
- Slide-in animations
- Close button
- Multiple toasts support

### Setup
Already integrated in `main.tsx`:

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

### Usage in Components
```tsx
import { useToast } from '@/components/ToastProvider';

function MyComponent() {
  const { showToast } = useToast();

  const handleSubmit = () => {
    // ... submit logic
    showToast('success', 'Application submitted successfully!', 3000);
  };

  const handleError = () => {
    showToast('error', 'Something went wrong. Please try again.', 5000);
  };

  const handleInfo = () => {
    showToast('info', 'Your profile is 80% complete', 4000);
  };

  const handleWarning = () => {
    showToast('warning', 'Your session will expire in 5 minutes', 6000);
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

---

## 11. Loading Spinners

**File**: `src/components/LoadingSpinner.tsx`

### Features
Three variants with different use cases

### Usage Examples

#### Basic Spinner
```tsx
<LoadingSpinner size="md" text="Loading..." />
```

#### Full Screen Loader
```tsx
{isLoading && <LoadingSpinner fullScreen text="Please wait..." />}
```

#### Page Loader
```tsx
{isLoading ? <PageLoader /> : <Content />}
```

#### Inline Loader
```tsx
<div className="content-section">
  {isLoading ? <InlineLoader text="Fetching data..." /> : <Data />}
</div>
```

---

## 12. Notification Badges

**File**: `src/components/NotificationBadge.tsx`

### Features
- Count badges with max limit
- Multiple colors
- Pulse animation option
- Dot badge variant

### Usage Examples

#### Count Badge
```tsx
<NotificationBadge count={5} max={99} color="red" pulse />
<NotificationBadge count={150} max={99} /> // Shows "99+"
```

#### Sizes
```tsx
<NotificationBadge count={3} size="sm" />
<NotificationBadge count={3} size="md" />
<NotificationBadge count={3} size="lg" />
```

#### Colors
```tsx
<NotificationBadge count={5} color="red" />
<NotificationBadge count={5} color="blue" />
<NotificationBadge count={5} color="green" />
<NotificationBadge count={5} color="yellow" />
```

#### Dot Badge
```tsx
<DotBadge color="red" pulse />
<DotBadge color="green" />
```

#### In Context (Bell Icon with Badge)
```tsx
<div className="relative">
  <BellIcon className="w-6 h-6" />
  <div className="absolute -top-1 -right-1">
    <NotificationBadge count={12} size="sm" color="red" pulse />
  </div>
</div>
```

---

## 13. Application Progress

**File**: `src/components/ApplicationProgress.tsx`

### Features
- Visual step indicators
- Animated progress line
- Current step highlighting
- Glow effect on active step

### Usage

#### Job Application Progress
```tsx
<JobApplicationProgress currentStep={2} />
// 0 = Applied, 1 = Screening, 2 = Interview, 3 = Offer
```

#### Custom Progress
```tsx
<ApplicationProgress
  steps={[
    { label: 'Step 1', status: 'completed' },
    { label: 'Step 2', status: 'current' },
    { label: 'Step 3', status: 'upcoming' },
  ]}
/>
```

---

## 14. Feature Cards

**File**: `src/components/FeatureCard.tsx`

### Features
- Beautiful gradient icons
- Hover effects with glow
- 5 color variants
- Staggered animations

### Usage
```tsx
<FeatureCard
  icon={Rocket}
  title="Fast Performance"
  description="Built with Vite for blazing fast development and production builds."
  color="blue"
  delay={0}
/>

<FeatureCard
  icon={Shield}
  title="Secure"
  description="Enterprise-grade security with JWT authentication and encryption."
  color="purple"
  delay={100}
/>
```

### Color Options
- `blue` - Tech/performance features
- `purple` - Premium/enterprise features
- `green` - Success/growth features
- `orange` - Innovation/speed features
- `pink` - Creative/design features

### Example Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <FeatureCard icon={Zap} title="Fast" description="..." color="blue" delay={0} />
  <FeatureCard icon={Lock} title="Secure" description="..." color="purple" delay={100} />
  <FeatureCard icon={Globe} title="Global" description="..." color="green" delay={200} />
</div>
```

---

## Complete Example: Job Listing Page

Here's how multiple components work together:

```tsx
import { useState } from 'react';
import { SkeletonGrid } from '@/components/SkeletonCard';
import { EnhancedJobCard } from '@/components/EnhancedJobCard';
import { FadeIn } from '@/components/PageTransition';
import { useToast } from '@/components/ToastProvider';
import { InlineLoader } from '@/components/LoadingSpinner';

export function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const handleBookmark = (jobId: string) => {
    // Bookmark logic
    showToast('success', 'Job bookmarked!', 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="text-4xl font-bold mb-8">Find Your Dream Job</h1>
      </FadeIn>

      {/* Loading State */}
      {isLoading ? (
        <SkeletonGrid type="job" count={9} />
      ) : (
        /* Job Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <FadeIn key={job.id} delay={index * 50}>
              <EnhancedJobCard job={job} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Best Practices

### Performance
1. Use `SkeletonCard` during data fetching
2. Add `delay` props to stagger animations
3. Limit particle count on mobile devices
4. Use `InlineLoader` for small sections

### Accessibility
1. All components have proper ARIA labels
2. Keyboard navigation supported
3. Focus states visible
4. Screen reader friendly

### User Experience
1. Show immediate feedback with toasts
2. Use skeleton loaders to prevent layout shift
3. Animate entrance for visual hierarchy
4. Keep animations subtle (under 500ms)

### Mobile
1. All components are fully responsive
2. Touch-friendly interactions
3. Reduced animations on mobile
4. Optimized performance

---

## Testing Checklist

- [ ] Particles render without lag
- [ ] Scroll progress updates accurately
- [ ] FAB menu opens/closes smoothly
- [ ] Back to top button appears at 300px
- [ ] Page transitions work on route change
- [ ] Job cards show hover effects
- [ ] Skeletons match content layout
- [ ] Live search debounces correctly
- [ ] Stats count up when visible
- [ ] Toasts appear and dismiss
- [ ] Loading spinners show during async
- [ ] Badges display correct counts
- [ ] Progress tracker updates steps
- [ ] Feature cards have glow effect

---

## Need Help?

- Check component source code for inline comments
- Review `VISUAL_ENHANCEMENTS.md` for technical details
- Test at http://localhost:5173/
- All components include TypeScript types

---

**Happy Coding! 🚀**
