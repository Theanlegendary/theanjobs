import os

css_path = r'Builtin-Clone/artifacts/builtin-recreation/src/index.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

start_marker = '.sample-matched-companies-page {'
end_marker = '/* ==========================================================================\n   HOMEPAGE ENHANCED COMPANY DIRECTORY'

start_idx = css.find(start_marker)
end_idx = css.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Error: Could not find markers in index.css')
    exit(1)

google_clean_css = '''
/* ==========================================================================
   GOOGLE-CLEAN / MODERN DESIGN: EFFORTLESS FOR THE EYE & ZERO CLUTTER
   ========================================================================== */
.sample-matched-companies-page {
  background: #fbfcfe;
  min-height: 100vh;
  padding-bottom: 80px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1f1f1f;
  -webkit-font-smoothing: antialiased;
}

/* 1. HERO SECTION (Airy, gentle ambient gradient, Google-pill search) */
.sample-companies-hero {
  background: radial-gradient(130% 120% at 50% 0%, #edf5ff 0%, #f6fafe 50%, #ffffff 100%);
  padding: 44px 0 32px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #eef2f6;
}

.sample-hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.sample-hero-left {
  flex: 1.25;
  max-width: 780px;
  z-index: 2;
}

.sample-hero-title {
  font-size: 42px;
  line-height: 1.15;
  font-weight: 800;
  color: #1f1f1f;
  letter-spacing: -0.035em;
  margin: 0 0 10px 0;
}

.sample-title-blue {
  color: #1a73e8;
  font-weight: 800;
}

.sample-hero-desc {
  font-size: 16px;
  color: #5f6368;
  line-height: 1.55;
  margin: 0 0 24px 0;
  max-width: 540px;
  font-weight: 400;
}

/* Single Horizontal Google Search & Chips Row */
.sample-search-single-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Google-style Search Capsule */
.sample-search-pill {
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  border-radius: 9999px;
  padding: 5px 6px 5px 18px;
  border: 1px solid #dfe1e5;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.08);
  gap: 10px;
  width: 330px;
  max-width: 100%;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.sample-search-pill:focus-within {
  border-color: #1a73e8;
  box-shadow: 0 4px 16px rgba(26, 115, 232, 0.16);
}

.sample-search-icon {
  color: #5f6368;
  flex-shrink: 0;
}

.sample-search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 13.5px;
  color: #1f1f1f;
  background: transparent;
}

.sample-search-input::placeholder {
  color: #80868b;
}

.sample-search-btn {
  background: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(26, 115, 232, 0.3);
}

.sample-search-btn:hover {
  background: #1557b0;
  box-shadow: 0 2px 6px rgba(26, 115, 232, 0.4);
}

/* Google Filter Chips */
.sample-filter-pill {
  display: inline-flex;
  align-items: center;
  position: relative;
  background: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 9999px;
  padding: 8px 16px;
  gap: 6px;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.04);
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.sample-filter-pill:hover {
  background: #f8f9fa;
  border-color: #1a73e8;
  color: #1a73e8;
}

.sample-pill-icon {
  color: #5f6368;
  flex-shrink: 0;
}

.sample-pill-select {
  border: none;
  outline: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 600;
  color: #3c4043;
  cursor: pointer;
  appearance: none;
  padding-right: 14px;
}

.sample-pill-chevron {
  position: absolute;
  right: 8px;
  color: #5f6368;
  pointer-events: none;
}

.sample-hero-right {
  flex: 0.85;
  max-width: 420px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.sample-hero-card-banner {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 10px 12px 10px 20px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.04);
  gap: 16px;
}

.sample-callout-text {
  display: flex;
  flex-direction: column;
}

.sample-callout-script {
  font-family: 'Segoe Script', 'Brush Script MT', 'Caveat', cursive, sans-serif;
  font-size: 21px;
  font-weight: 700;
  color: #1a73e8;
  font-style: italic;
  line-height: 1.15;
}

.sample-callout-sub {
  font-family: 'Segoe Script', 'Brush Script MT', 'Caveat', cursive, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  font-style: italic;
  margin-top: 2px;
}

.sample-skyline-img {
  height: 110px;
  width: auto;
  max-width: 200px;
  object-fit: cover;
  border-radius: 14px;
  display: block;
}

/* 2. FEATURED COMPANIES (Clean, calm, Google-like cards) */
.sample-featured-section {
  padding: 32px 0 20px;
}

.sample-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.sample-section-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sample-section-title {
  font-size: 20px;
  font-weight: 700;
  color: #202124;
  margin: 0;
  letter-spacing: -0.02em;
}

.sample-see-all-link {
  font-size: 13.5px;
  font-weight: 600;
  color: #1a73e8;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.sample-see-all-link:hover {
  color: #1557b0;
  text-decoration: underline;
}

.sample-featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

/* The Compact Card (Google Lens Style: Calm White, Soft Shadow, Organic Corners) */
.sample-compact-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #edf1f7;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-height: 136px;
  box-shadow: 0 1px 3px rgba(32, 33, 36, 0.04), 0 2px 8px rgba(32, 33, 36, 0.02);
  text-decoration: none;
  color: inherit;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.sample-compact-card:hover {
  border-color: rgba(26, 115, 232, 0.4);
  box-shadow: 0 10px 24px -4px rgba(32, 33, 36, 0.08), 0 4px 10px -2px rgba(32, 33, 36, 0.04);
  transform: translateY(-2px);
}

.sample-card-left-pane {
  flex: 1;
  padding: 16px 16px 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  min-width: 0;
}

.sample-card-header-line {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sample-company-avatar {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: contain;
  background: #ffffff;
  border: 1px solid #f1f3f4;
  padding: 3px;
  flex-shrink: 0;
}

.sample-header-text-block {
  min-width: 0;
  flex: 1;
}

.sample-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sample-name-bold {
  font-size: 15px;
  font-weight: 700;
  color: #1f1f1f;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.sample-verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #1a73e8;
  color: #ffffff;
  font-size: 9px;
  font-weight: 900;
  line-height: 1;
  flex-shrink: 0;
}

.sample-subline-text {
  font-size: 12px;
  color: #5f6368;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sample-tagline-text {
  font-size: 12.5px;
  color: #444746;
  line-height: 1.45;
  margin: 3px 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
}

/* Soft, Calm Metadata Chips (No Neon Clash!) */
.sample-pills-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.sample-emp-pill {
  font-size: 11px;
  font-weight: 500;
  color: #3c4043;
  background: #f1f3f4;
  border-radius: 6px;
  padding: 3px 8px;
  display: inline-flex;
  align-items: center;
}

.sample-mode-pill {
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  padding: 3px 8px;
}

.sample-mode-pill.hybrid-green {
  background: #e8f0fe;
  color: #1a73e8;
}

.sample-mode-pill.onsite-blue {
  background: #f1f3f4;
  color: #3c4043;
}

.sample-card-right-pane {
  width: 120px;
  min-width: 120px;
  max-width: 120px;
  position: relative;
  overflow: hidden;
  border-top-right-radius: 17px;
  border-bottom-right-radius: 17px;
  flex-shrink: 0;
  background: #f8f9fa;
}

.sample-card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sample-floating-arrow-btn {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3c4043;
  transition: all 0.15s ease;
  z-index: 2;
}

.sample-compact-card:hover .sample-floating-arrow-btn {
  background: #1a73e8;
  color: #ffffff;
}

/* 3. DIRECTORY GRID & TOOLBAR */
.sample-directory-section {
  padding: 24px 0 50px;
}

.sample-toolbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.sample-toolbar-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.sample-tool-pill {
  position: relative;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 9999px;
  padding: 7px 14px;
  gap: 6px;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.04);
  cursor: pointer;
  transition: all 0.15s ease;
}

.sample-tool-pill:hover {
  background: #f8f9fa;
  border-color: #1a73e8;
}

.sample-tool-select {
  border: none;
  outline: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 600;
  color: #3c4043;
  cursor: pointer;
  appearance: none;
  padding-right: 14px;
}

.sample-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sample-sort-pill {
  position: relative;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 9999px;
  padding: 7px 14px;
  gap: 6px;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.04);
}

.sample-sort-label {
  font-size: 12px;
  font-weight: 500;
  color: #5f6368;
}

.sample-sort-select {
  border: none;
  outline: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 600;
  color: #1f1f1f;
  cursor: pointer;
  appearance: none;
  padding-right: 14px;
}

.sample-view-toggle {
  display: flex;
  align-items: center;
  background: #f1f3f4;
  border-radius: 8px;
  padding: 2px;
  gap: 2px;
}

.sample-view-btn {
  background: none;
  border: none;
  border-radius: 6px;
  padding: 6px 9px;
  color: #5f6368;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.sample-view-btn.active-grid {
  background: #ffffff;
  color: #1a73e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Directory 3-Column Grid */
.sample-directory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 32px;
}

.sample-directory-card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #edf1f7;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-height: 136px;
  box-shadow: 0 1px 3px rgba(32, 33, 36, 0.04), 0 2px 8px rgba(32, 33, 36, 0.02);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.sample-directory-card:hover {
  border-color: rgba(26, 115, 232, 0.4);
  box-shadow: 0 10px 24px -4px rgba(32, 33, 36, 0.08), 0 4px 10px -2px rgba(32, 33, 36, 0.04);
  transform: translateY(-2px);
}

.sample-name-bold-link {
  font-size: 15px;
  font-weight: 700;
  color: #1f1f1f;
  text-decoration: none;
  line-height: 1.25;
  letter-spacing: -0.01em;
  transition: color 0.15s ease;
}

.sample-name-bold-link:hover {
  color: #1a73e8;
}

.sample-open-jobs-link {
  font-size: 12px;
  font-weight: 600;
  color: #1a73e8;
  text-decoration: none;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.15s ease;
}

.sample-open-jobs-link:hover {
  color: #1557b0;
  gap: 7px;
}

.sample-load-more-wrap {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.sample-load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 9999px;
  padding: 11px 32px;
  font-size: 13.5px;
  font-weight: 600;
  color: #1a73e8;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(60, 64, 67, 0.08);
  transition: all 0.18s ease;
}

.sample-load-more-btn:hover {
  background: #f8f9fa;
  border-color: #1a73e8;
  box-shadow: 0 3px 8px rgba(26, 115, 232, 0.16);
}

/* RESPONSIVE BREAKPOINTS */
@media (max-width: 1080px) {
  .sample-featured-grid,
  .sample-directory-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sample-hero-container {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .sample-hero-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .sample-hero-right {
    width: 100%;
    justify-content: flex-start;
  }
  .sample-featured-grid,
  .sample-directory-grid {
    grid-template-columns: 1fr;
  }
  .sample-search-single-row {
    width: 100%;
  }
  .sample-search-pill {
    width: 100%;
  }
}

'''

new_css = css[:start_idx] + google_clean_css + '\n' + css[end_idx:]
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(new_css)

print('Successfully replaced sample companies CSS with Google-Clean design!')
