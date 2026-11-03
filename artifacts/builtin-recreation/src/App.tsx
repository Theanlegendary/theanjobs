import React from 'react';
import { Route, Switch } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { PageTransition } from '@/components/PageTransition';

// Main Pages
import Home from '@/pages/Home';
import Companies from '@/pages/Companies';
import Jobs from '@/pages/Jobs';
import Articles from '@/pages/Articles';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import UserProfile from '@/pages/UserProfile';

// Merged Detail Pages from thesandbox-logistics-platform
import JobDetail from '@/pages/JobDetail';
import CompanyDetail from '@/pages/CompanyDetail';
import ArticleDetail from '@/pages/ArticleDetail';
import MentorDetail from '@/pages/MentorDetail';
import CvBuilderPage from '@/pages/CvBuilderPage';
import PostJobPage from '@/pages/PostJobPage';
import CandidateDashboard from '@/pages/CandidateDashboard';
import EmployerAts from '@/pages/EmployerAts';
import CourseDetail from '@/pages/CourseDetail';
import PolicyDetail from '@/pages/PolicyDetail';

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell relative bg-white text-slate-900">
      <ScrollProgress />
      <Header />
      <PageTransition>
        <div className="relative z-10">{children}</div>
      </PageTransition>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      {/* Authentication Pages */}
      <Route path="/login">
        <Login />
      </Route>
      
      <Route path="/register">
        <Register />
      </Route>
      
      <Route path="/profile">
        <PageShell><UserProfile /></PageShell>
      </Route>
      
      {/* Home Page */}
      <Route path="/">
        <PageShell><Home /></PageShell>
      </Route>

      {/* Jobs Listing & Master-Detail */}
      <Route path="/jobs">
        <PageShell><Jobs /></PageShell>
      </Route>

      {/* Dedicated Job Detail Pages (No popup modals!) */}
      <Route path="/jobs/:id">
        <PageShell><JobDetail /></PageShell>
      </Route>
      <Route path="/job/:id">
        <PageShell><JobDetail /></PageShell>
      </Route>
      <Route path="/job-detail">
        <PageShell><JobDetail /></PageShell>
      </Route>

      {/* Companies Listing */}
      <Route path="/companies">
        <PageShell><Companies /></PageShell>
      </Route>
      <Route path="/companie">
        <PageShell><Companies /></PageShell>
      </Route>

      {/* Dedicated Company Detail Pages (Built In + LinkedIn layout) */}
      <Route path="/companies/:id">
        <PageShell><CompanyDetail /></PageShell>
      </Route>
      <Route path="/companie/:id">
        <PageShell><CompanyDetail /></PageShell>
      </Route>
      <Route path="/company/:id">
        <PageShell><CompanyDetail /></PageShell>
      </Route>
      <Route path="/company-detail">
        <PageShell><CompanyDetail /></PageShell>
      </Route>

      {/* Articles & Tech Topics Listing */}
      <Route path="/tech-topics">
        <PageShell><Articles /></PageShell>
      </Route>
      <Route path="/articles">
        <PageShell><Articles /></PageShell>
      </Route>
      <Route path="/article">
        <PageShell><Articles /></PageShell>
      </Route>

      {/* Dedicated Editorial Article / News Detail Pages */}
      <Route path="/articles/:id">
        <PageShell><ArticleDetail /></PageShell>
      </Route>
      <Route path="/news/:slug">
        <PageShell><ArticleDetail /></PageShell>
      </Route>
      <Route path="/news-detail">
        <PageShell><ArticleDetail /></PageShell>
      </Route>

      {/* Dedicated Mentor Profile & 1-on-1 Booking Pages (No popup modals!) */}
      <Route path="/mentors/:id">
        <PageShell><MentorDetail /></PageShell>
      </Route>
      <Route path="/mentor/:id">
        <PageShell><MentorDetail /></PageShell>
      </Route>
      <Route path="/mentor-detail">
        <PageShell><MentorDetail /></PageShell>
      </Route>

      {/* Dedicated ATS Resume Builder Page (No popup modal!) */}
      <Route path="/cv-builder">
        <PageShell><CvBuilderPage /></PageShell>
      </Route>
      <Route path="/ats-builder">
        <PageShell><CvBuilderPage /></PageShell>
      </Route>

      {/* Dedicated Post a Job / HR Announcement Page (No popup modal!) */}
      <Route path="/post-job">
        <PageShell><PostJobPage /></PageShell>
      </Route>
      <Route path="/create-post">
        <PageShell><PostJobPage /></PageShell>
      </Route>

      {/* Candidate Dashboard */}
      <Route path="/candidate-dashboard">
        <PageShell><CandidateDashboard /></PageShell>
      </Route>
      <Route path="/dashboard">
        <PageShell><CandidateDashboard /></PageShell>
      </Route>

      {/* Employer ATS Pipeline */}
      <Route path="/employer-ats">
        <PageShell><EmployerAts /></PageShell>
      </Route>

      {/* Courses & Certification Detail */}
      <Route path="/courses">
        <PageShell><CourseDetail /></PageShell>
      </Route>
      <Route path="/courses/:id">
        <PageShell><CourseDetail /></PageShell>
      </Route>
      <Route path="/course-detail">
        <PageShell><CourseDetail /></PageShell>
      </Route>

      {/* Policy & Regulatory Gazette */}
      <Route path="/policy-detail">
        <PageShell><PolicyDetail /></PageShell>
      </Route>
      <Route path="/policies/:id">
        <PageShell><PolicyDetail /></PageShell>
      </Route>

      {/* Fallback to Home */}
      <Route>
        <PageShell><Home /></PageShell>
      </Route>
    </Switch>
  );
}
