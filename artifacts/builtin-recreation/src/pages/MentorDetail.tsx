import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import {
  Star,
  CheckCircle,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Video
} from 'lucide-react';
import { getMentorById, mentorsDatabase, MentorProfile } from '@/data/portalData';

export default function MentorDetail() {
  const params = useParams<{ id?: string }>();
  const searchParams = new URLSearchParams(window.location.search);
  const mentorId = params.id || searchParams.get('id') || 'm-1';

  const mentor: MentorProfile = getMentorById(mentorId) || mentorsDatabase[0];

  // Booking Form State (NO POPUP!)
  const [selectedSlot, setSelectedSlot] = useState(mentor.availableSlots[0]);
  const [selectedTopic, setSelectedTopic] = useState(mentor.sessionTopics[0]?.title || '');
  const [menteeName, setMenteeName] = useState('');
  const [menteeEmail, setMenteeEmail] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [mentorId]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menteeName || !menteeEmail) {
      alert('Please provide your name and email address to book a session.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const refCode = 'MENTOR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const newBooking = {
        id: 'book-' + Date.now(),
        refCode,
        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorRole: mentor.role,
        mentorCompany: mentor.company,
        slot: selectedSlot,
        topic: selectedTopic,
        menteeName,
        menteeEmail,
        sessionNotes,
        bookedAt: new Date().toISOString()
      };

      try {
        const prev = JSON.parse(localStorage.getItem('thesandbox_mentor_bookings') || '[]');
        localStorage.setItem('thesandbox_mentor_bookings', JSON.stringify([newBooking, ...prev]));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setSubmitting(false);
      setBookingRef(refCode);
    }, 600);
  };

  return (
    <div className="mentor-detail-page-container">
      {/* 1. Breadcrumbs */}
      <div className="mentor-breadcrumb-bar">
        <div className="container mentor-breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <Link href="/" className="crumb-link">Career Advisory</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{mentor.name}</span>
        </div>
      </div>

      {/* 2. Mentor Hero Card */}
      <section className="mentor-hero-section">
        <div className="container mentor-hero-inner">
          <div className="mentor-avatar-box">
            <img src={mentor.avatar} alt={mentor.name} className="mentor-hero-avatar" />
            {mentor.online && (
              <span className="mentor-online-badge-hero">
                <span className="online-dot" /> Online for Bookings
              </span>
            )}
          </div>

          <div className="mentor-hero-info">
            <div className="mentor-rating-badge">
              <Star size={14} className="star-icon" />
              <strong>{mentor.rating.toFixed(1)}</strong>
              <span>({mentor.sessionsCount} verified sessions completed)</span>
            </div>

            <h1 className="mentor-hero-name">{mentor.name}</h1>
            <p className="mentor-hero-role">{mentor.role} • <strong>{mentor.company}</strong></p>
            <p className="mentor-hero-lead">{mentor.bioLead}</p>

            <div className="mentor-expertise-chips">
              {mentor.expertiseTags.map((tag, i) => (
                <span key={i} className="expertise-chip">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main 2-Column Grid */}
      <main className="container mentor-main-grid">
        {/* Left Column: Background, Topics & Reviews */}
        <div className="mentor-left-column">
          {/* Card: Biography */}
          <section className="mentor-section-card">
            <h3 className="section-title">Professional Background & Mentorship Philosophy</h3>
            <p className="mentor-full-bio">{mentor.fullBio}</p>
          </section>

          {/* Card: Focus Topics */}
          <section className="mentor-section-card">
            <h3 className="section-title">1-on-1 Mentorship Programs</h3>
            <div className="topics-list">
              {mentor.sessionTopics.map((top, i) => (
                <div key={i} className="topic-item-card">
                  <div className="topic-header">
                    <h4>{top.title}</h4>
                    <span className="topic-duration"><Clock size={13} /> {top.duration}</span>
                  </div>
                  <p className="topic-desc">{top.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Card: Verified Mentee Reviews */}
          <section className="mentor-section-card">
            <h3 className="section-title">Verified Mentee Testimonials</h3>
            <div className="reviews-list">
              {mentor.reviews.map((rev, i) => (
                <div key={i} className="review-item-card">
                  <div className="review-rating-row">
                    <div className="stars-row">
                      {[...Array(rev.rating)].map((_, s) => (
                        <Star key={s} size={13} className="star-fill" />
                      ))}
                    </div>
                    <span className="mentee-name">{rev.mentee}</span>
                    <span className="mentee-role">• {rev.role}</span>
                  </div>
                  <blockquote className="review-comment">"{rev.comment}"</blockquote>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: ON-PAGE Booking Form (NO POPUP!) */}
        <aside className="mentor-right-column">
          <div className="onpage-booking-card">
            <div className="booking-card-header">
              <span className="booking-kicker-tag">DIRECT 1-ON-1 SESSION</span>
              <h3 className="booking-title">Book Session with {mentor.name}</h3>
              <p className="booking-sub">
                Select your preferred slot and session topic. Calendar invite and video meeting room link will be dispatched to your email.
              </p>
            </div>

            {bookingRef ? (
              <div className="booking-success-box">
                <CheckCircle size={44} className="booking-success-icon" />
                <h4>Mentorship Session Reserved!</h4>
                <p>
                  A calendar invite with Google Meet / Zoom credentials has been dispatched to <strong>{menteeEmail}</strong>.
                </p>
                <div className="booking-ref-badge">
                  Booking Confirmation: <strong>{bookingRef}</strong>
                </div>
                <div className="booking-details-summary">
                  <div><strong>Mentor:</strong> {mentor.name} ({mentor.company})</div>
                  <div><strong>Slot:</strong> {selectedSlot}</div>
                  <div><strong>Topic:</strong> {selectedTopic}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBookingRef(null);
                    setMenteeName('');
                    setMenteeEmail('');
                    setSessionNotes('');
                  }}
                  className="btn-book-another"
                >
                  Schedule Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="onpage-booking-form">
                {/* Slot Selection */}
                <div className="form-group">
                  <label htmlFor="slot-select">Available Time Slot *</label>
                  <select
                    id="slot-select"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="select-slot-input"
                  >
                    {mentor.availableSlots.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Topic Selection */}
                <div className="form-group">
                  <label htmlFor="topic-select">Mentorship Program / Focus *</label>
                  <select
                    id="topic-select"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="select-slot-input"
                  >
                    {mentor.sessionTopics.map((top, i) => (
                      <option key={i} value={top.title}>{top.title} ({top.duration})</option>
                    ))}
                  </select>
                </div>

                {/* Mentee Name */}
                <div className="form-group">
                  <label htmlFor="mentee-name">Your Full Name *</label>
                  <input
                    id="mentee-name"
                    type="text"
                    required
                    placeholder="e.g. David Sterling"
                    value={menteeName}
                    onChange={(e) => setMenteeName(e.target.value)}
                  />
                </div>

                {/* Mentee Email */}
                <div className="form-group">
                  <label htmlFor="mentee-email">Work or Academic Email *</label>
                  <input
                    id="mentee-email"
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={menteeEmail}
                    onChange={(e) => setMenteeEmail(e.target.value)}
                  />
                </div>

                {/* Career Goals / Notes */}
                <div className="form-group">
                  <label htmlFor="session-notes">Key Goals & Questions for Mentor</label>
                  <textarea
                    id="session-notes"
                    rows={3}
                    placeholder="Share what specific challenges, codebases, or career decisions you would like to focus on..."
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-confirm-booking"
                >
                  {submitting ? 'Confirming Reservation...' : 'Confirm 1-on-1 Mentorship Booking'}
                </button>

                <p className="booking-guarantee-note">
                  <Video size={13} /> 100% video-based session with verified recording and follow-up notes.
                </p>
              </form>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
