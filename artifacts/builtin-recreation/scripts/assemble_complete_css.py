import subprocess

# 1. Base Built In CSS from git commit 8d55b79
result = subprocess.run(
    ['git', 'show', '8d55b79:artifacts/builtin-recreation/src/index.css'],
    cwd='Builtin-Clone',
    capture_output=True,
    text=True,
    encoding='utf-8'
)
base_css = result.stdout

with open('part_wired.css', 'r', encoding='utf-8') as f:
    wired_css = f.read()

with open('step_813_opp.css', 'r', encoding='utf-8') as f:
    opp_cards_css = f.read()

with open('part_internships.css', 'r', encoding='utf-8') as f:
    internships_css = f.read()

with open('step_1232_misc.css', 'r', encoding='utf-8') as f:
    misc_dir_css = f.read()

with open('part_companies_experts.css', 'r', encoding='utf-8') as f:
    companies_experts_css = f.read()

with open('part_cv.css', 'r', encoding='utf-8') as f:
    cv_css = f.read()

with open('part_cv_mockup_extracted.css', 'r', encoding='utf-8') as f:
    cv_mockup_css = f.read()

responsive_and_helpers_css = '''
/* ==========================================================================
   UNIVERSAL RESPONSIVE RESET & LAYOUT SAFEGUARDS
   ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
}

#root, .page-shell {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.builtin-homepage {
  min-height: 100vh;
  background: #ffffff;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.builtin-content-section {
  margin: 48px auto;
  width: 100%;
  box-sizing: border-box;
}

.cv-banner-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cv-banner-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
}

.facade-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.datadog-facade {
  background: rgba(99, 102, 241, 0.85);
}
.facade-icon {
  display: block;
  flex-shrink: 0;
}
.facade-text {
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.05em;
}
.bytedance-facade-bars {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 18px;
}
.bar-b {
  width: 4px;
  border-radius: 2px;
}
.bar-1 { height: 10px; background: #3b82f6; }
.bar-2 { height: 16px; background: #06b6d4; }
.bar-3 { height: 12px; background: #3b82f6; }
.bar-4 { height: 18px; background: #06b6d4; }

.mockup-skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.mockup-skill {
  background: #f1f5f9;
  color: #334155;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.home-dir-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}
.home-dir-text-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.roles-pill-icon,
.meta-pin-icon,
.meta-policy-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
.fw-sub-badge {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
}
.light {
  background: #ffffff;
}

.poster-dash {
  width: 28px;
  height: 3px;
  background: #3b82f6;
  border-radius: 2px;
  margin-bottom: 12px;
}

.text-blue-600 { color: #2563eb; }
.text-slate-400 { color: #94a3b8; }
.text-slate-600 { color: #475569; }

/* ==========================================================================
   HOMEPAGE COMPREHENSIVE RESPONSIVE ADJUSTMENTS
   ========================================================================== */
@media (max-width: 900px) {
  /* 1. Header mobile */
  .site-header {
    height: 58px;
  }
  .header-inner {
    padding: 0 14px;
    justify-content: space-between;
  }
  .desktop-nav,
  .account-nav .employer-link,
  .account-nav .join-link,
  .account-nav .login-link {
    display: none !important;
  }
  .mobile-controls {
    display: flex !important;
    align-items: center;
    gap: 8px;
  }
  .mobile-bottom-nav {
    display: flex !important;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 54px;
    background: #ffffff;
    border-top: 1px solid #e2e8f0;
    z-index: 50;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.06);
  }
  .mobile-bottom-nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    color: #64748b;
    font-size: 10px;
    font-weight: 600;
    text-decoration: none;
  }
  .mobile-bottom-nav a:hover,
  .mobile-bottom-nav a.active {
    color: #09005f;
  }
  .mobile-bottom-nav .mini-icon {
    font-size: 16px;
    line-height: 1;
  }
  body {
    padding-bottom: 58px;
  }

  /* 2. Wired Editorial Grid */
  .wired-editorial-wrapper {
    padding: 16px 0 24px;
  }
  .wired-topics-subnav {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
  }
  .wired-subnav-links {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 4px;
  }
  .wired-subnav-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .wired-main-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .wired-picks-split {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .wired-stack-story img,
  .wired-center-hero img {
    max-height: 220px;
    width: 100%;
    object-fit: cover;
  }

  /* 3. Internships Carousel */
  .opp-floating-arrow {
    display: none !important;
  }
  .opp-carousel-track .square-opp-card {
    flex: 0 0 85% !important;
    min-width: 85% !important;
    max-width: 85% !important;
  }

  /* 4. Trusted Companies Section */
  .home-trusted-companies-section {
    flex-direction: column;
    gap: 20px;
  }
  .home-trusted-partner-poster {
    width: 100% !important;
    min-height: 240px;
    border-radius: 16px;
  }
  .home-directory-main-panel {
    width: 100% !important;
    padding: 16px;
    border-radius: 16px;
  }
  .home-dir-filter-row {
    flex-direction: column;
    gap: 10px;
  }
  .home-dir-search-box {
    width: 100%;
    max-width: 100%;
  }
  .home-dir-select {
    width: 100%;
  }
  .home-dir-company-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }
  .home-dir-card-meta-pane {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #edf1f7;
    padding-top: 12px;
  }

  /* 5. Experts Showcase */
  .experts-floating-arrow {
    display: none !important;
  }
  .home-experts-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .home-experts-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 12px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .home-experts-grid::-webkit-scrollbar {
    display: none;
  }
  .home-expert-card {
    flex: 0 0 280px;
    min-width: 280px;
    scroll-snap-align: start;
  }

  /* 6. ATS CV Banner */
  .cv-banner-container {
    grid-template-columns: 1fr;
    padding: 24px 16px;
    gap: 24px;
  }
  .cv-mockup-paper {
    padding: 16px;
    font-size: 11px;
    width: 100%;
    box-sizing: border-box;
  }
}

/* ==========================================================================
   GOOGLE-CLEAN / MODERN DESIGN: ZERO CLUTTER & CALM VISUALS
   ========================================================================== */
.sample-matched-companies-page {
  background: #fbfcfe;
  min-height: 100vh;
  padding-bottom: 80px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1f1f1f;
  -webkit-font-smoothing: antialiased;
  width: 100%;
  overflow-x: hidden;
}

.google-clean-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #edf1f7;
  box-shadow: 0 1px 3px rgba(32, 33, 36, 0.04);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.google-clean-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(32, 33, 36, 0.08);
  border-color: #dfe3eb;
}

.btn-co-save {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: 1px solid #dfe1e5;
  background: #ffffff;
  color: #3c4043;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-co-save:hover {
  background: #f8f9fa;
  border-color: #dadce0;
}
.btn-co-save.saved {
  background: #fce8e6;
  border-color: #fad2cf;
  color: #d93025;
}

.co-sidebar-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #edf1f7;
  box-shadow: 0 1px 3px rgba(32, 33, 36, 0.04);
  padding: 24px;
}

.co-contact-dossier {
  background: #f8fafd;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #edf1f7;
}

.co-photos-grid-mini {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}
.co-photo-thumb {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 16 / 10;
  border: 1px solid #edf1f7;
  transition: transform 0.2s ease;
}
.co-photo-thumb:hover {
  transform: scale(1.03);
}
.co-photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.co-lightbox-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.co-lightbox-content {
  max-width: 900px;
  max-height: 80vh;
  position: relative;
}
.co-lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.focus-ring {
  transition: all 0.2s ease;
}
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.25);
}

/* Companies Directory Page Responsive */
@media (max-width: 768px) {
  .sample-hero-container {
    flex-direction: column !important;
    align-items: flex-start !important;
    padding: 0 16px !important;
  }
  .sample-hero-right {
    display: none !important;
  }
  .sample-hero-title {
    font-size: 28px !important;
  }
  .sample-search-wrapper {
    flex-direction: column !important;
    width: 100% !important;
    gap: 8px !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .sample-search-box {
    background: #ffffff !important;
    border: 1px solid #dfe1e5 !important;
    border-radius: 9999px !important;
    padding: 0 16px !important;
    width: 100% !important;
    box-shadow: 0 1px 4px rgba(32,33,36,0.08) !important;
  }
  .sample-search-btn {
    width: 100% !important;
    border-radius: 9999px !important;
    height: 44px !important;
  }
  .sample-quick-filters {
    flex-direction: column !important;
    gap: 8px !important;
  }
  .sample-dropdown-pill {
    width: 100% !important;
  }
  .sample-featured-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  .sample-directory-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}

/* Company Detail Page Responsive */
@media (max-width: 900px) {
  .co-layout-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
  .co-sidebar-column {
    width: 100% !important;
  }
  .co-header-content {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 16px !important;
  }
  .co-header-actions {
    width: 100% !important;
    justify-content: flex-start !important;
  }
  .co-nav-tabs {
    overflow-x: auto !important;
    white-space: nowrap !important;
    width: 100% !important;
  }
}
'''

full_css = f"""{base_css}

/* ==========================================================================
   HOMEPAGE WIRED-STYLE EDITORIAL SHOWCASE
   ========================================================================== */
{wired_css}

/* ==========================================================================
   SQUARE OPPORTUNITY CARDS
   ========================================================================== */
{opp_cards_css}

/* ==========================================================================
   HOMEPAGE LATEST INTERNSHIPS & OPPORTUNITIES CAROUSEL
   ========================================================================== */
{internships_css}

/* ==========================================================================
   HOMEPAGE COMPANY DIRECTORY HEADER STRIP
   ========================================================================== */
{misc_dir_css}

/* ==========================================================================
   HOMEPAGE ENHANCED COMPANY DIRECTORY & EXPERTS SHOWCASE
   ========================================================================== */
{companies_experts_css}

/* ==========================================================================
   HOMEPAGE ATS CV BANNER
   ========================================================================== */
{cv_css}

{cv_mockup_css}

{responsive_and_helpers_css}
"""

target_path = 'Builtin-Clone/artifacts/builtin-recreation/src/index.css'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(full_css)

print(f"Assembled complete responsive index.css! Total length: {len(full_css)} bytes")
