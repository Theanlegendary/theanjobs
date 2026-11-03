# SandBox / Builtin Design System Specification

> **Theme Definition**: High-Contrast Editorial Showcase combined with Clean Rounded Modern Cards ("Việc Làm Tốt Nhất" & "Latest Internships") and SandBox Corporate Portals.

---

## 1. Action Buttons & CTAs (Immutable Design Standard)

These styles must be preserved across all pages and features.

### A. Primary Job Card Button (`View Details & Apply →`)
- **Class**: `.opp-apply-btn`
- **Background**: `#0037a5` (SandBox Deep Blue)
- **Text Color**: `#ffffff`
- **Border Radius**: `999px` (Fully rounded pill)
- **Padding**: `9px 20px` (or `8px 18px` in compact views)
- **Font**: Inter / sans-serif, weight `700`, size `13px` / `14px`
- **Hover State**: `background: #002b82`, slight translate
- **Usage**: Used in `Latest Internships` cards, featured jobs, and opportunity listings.

### B. Editorial Post Action (`+ Post Article`)
- **Class**: `.wired-create-post-btn`
- **Background**: `#000000` (Pure Black)
- **Text Color**: `#ffffff`
- **Border Radius**: `4px`
- **Padding**: `5px 12px`
- **Font**: Weight `700`, size `11px`, letter-spacing `0.05em`
- **Usage**: Appears on the right of the editorial sub-navigation bar next to `Archives →`.

### C. Directory Section View All (`XEM TẤT CẢ >` / `View All →`)
- **Style**: Text-only CTA with uppercase tracking and chevron
- **Font**: Weight `700`, size `13px`, tracking `0.08em`
- **Color**: `#2563eb` (Blue) or `#000000` (Neutral dark)
- **Hover**: Underline or subtle right nudge

---

## 2. Editorial Section Patterns (Wired / Sandbox Style)

### A. Badge Headers & Horizontal Dividers
- **Left Badge**: Black rectangle badge (`background: #000000; color: #ffffff; padding: 3px 8px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; display: inline-block;`)
- **Container Line**: Container has `border-bottom: 2px solid #000000;` directly aligned with the base of the badge.
- **Examples**: `TODAY'S PICKS`, `MOST RECENT`, `EDITORIAL PICKS`.

### B. Sub-Navigation Bar
- **Border**: Top `1px solid #000000`, bottom `1px solid #e5e7eb`.
- **Items**: Uppercase bold text (`TODAY`, `BUSINESS`, `AI SYSTEMS`, `CULTURE`, `INFRASTRUCTURE`, `SECURITY`, `CAREER`), `font-size: 11px`, `font-weight: 700`, `letter-spacing: 0.08em`.
- **Active State**: Solid underline `2px solid #0037a5`.

### C. Typography Hierarchy
- **Category Kicker**: `text-xs font-bold uppercase tracking-wider text-black mb-1.5` (e.g. `POLICY & REMOTE TRENDS`, `SPECIAL INVESTIGATION`).
- **Main Hero Headline**: Bold condensed headline (`font-black uppercase tracking-tight text-black text-2xl lg:text-3xl leading-tight`).
- **Author Tag**: All-caps author name (`font-bold text-[11px] uppercase tracking-wider text-black`).

---

## 3. Card Directory Patterns

### A. "Việc Làm Tốt Nhất" 3x3 Grid
- **Card Container**: White card (`background: #ffffff; border: 1px solid #edf2f7; border-radius: 12px; padding: 16px; transition: all 0.2s;`)
- **Logo**: 48x48 rounded box with subtle gray border (`border: 1px solid #e2e8f0; border-radius: 8px; object-fit: contain;`)
- **Title**: `font-bold text-[15px] text-gray-900 truncate`
- **Salary Highlighting**: Bold accent red/orange (`font-bold text-[14px] text-[#e03a14]` or `#dc2626`)
- **Badges**: Red outline/pill badge for `🔥 Hot`.

### B. "Latest Internships" Card
- **Header**: Aspect-ratio dark office photo with rounded pill badge (`Full-time`) on the top-left and bookmark button on top-right.
- **Body**: Company logo + company title with verified blue checkmark.
- **Job Title**: Large bold heading (`font-bold text-lg text-[#0f172a] line-clamp-2`).
- **Salary Bar**: Gray rounded container (`bg-gray-100 rounded-lg py-1.5 px-3 flex items-center justify-between font-semibold text-sm`).
- **Footer**: Relative posted time (`Vừa đăng`, `1 ngày trước`) + `.opp-apply-btn` (`View Details & Apply →`).

---

## 4. Job & Company Detail Page Layout

### A. Job Detail 3-Card Hero Layout
- **Container**: `.job-hero-cards-grid` (CSS Grid 3-column on desktop).
- **Card 1 (Primary)**: Company logo, verified badge, company name, bold job title, hot job badge.
- **Card 2 (Role Specs)**: Location, workplace model, seniority tier with clean icons.
- **Card 3 (Action / Compensation)**: Total compensation / stipend, benefit pills, `.apply-cta-btn` (`Apply Directly on Page →`), save bookmark button.

### B. Unified Creative & Responsive Company Profile Layout (`/companies/:id`)
- **Panoramic Hero & Floating Card**:
  - Full-width cover banner with dark gradient overlay.
  - Floating profile card bridging the cover image with a 96×96 rounded logo badge, verified checkmark, tier badge, industry tag, and live green hiring status pulse (`● Actively Hiring`).
  - Action buttons: Primary `View Open Roles (3) ↓`, `Official Website ↗`, interactive `Save Company` with heart toggle, and `Share Profile`.
- **4 Key Metrics Tiles Bar**:
  - 4-tile grid on desktop, responsive 2×2 grid on mobile:
    - 📍 `HEADQUARTERS`: City & Country
    - 👥 `ORGANIZATION SIZE`: Total team count & specialist breakdown
    - 📅 `FOUNDED`: Founding year & years in business
    - 🌐 `INTERNATIONAL HUBS`: Locations count & regions
- **Sticky Section Jump Bar**:
  - Floating pill sub-nav: `About & Mission` • `Open Roles ({count})` • `Offices & Locations` • `Focus & Expertise` • `Contact & Campus`.
- **Main 2-Column Responsive Layout**:
  - **Left Primary Column**:
    - **About & Vision**: Narrative with highlighted impact, executive leadership quote card, and 4-photo campus gallery with click-to-expand lightbox.
    - **Open Roles**: Real-time work-style filter chips (`All`, `Remote`, `Hybrid`, `On-site`) and scannable job rows with compensation and standard `.opp-apply-btn` (`View Details & Apply →`).
    - **International Hubs**: 2-column office cards with HQ badges, location, and regional specialization.
    - **Practice Areas & Domains**: Pillars for technology & policy compliance.
  - **Right Sidebar Column (Sticky on desktop, stacks gracefully on mobile)**:
    - Recruiter Contact Dossier (Hotline, direct mailto email, campus address, official website button).
    - Why Specialists Choose Us (benefits list).
    - Explore Similar Firms with direct links.

---

---

## 6. Core Global Rules (Strict Constraints)

1. **Max 1 Border Per Section / Container**:
   - Each visual card, container, or section may have **at most 1 border**.
   - **No nested or double borders**: If an outer card has a border, child containers (such as the logo box, salary pill, or badge) must NOT have extra borders.
   - Keep borders subtle, clean, and minimal (`border border-slate-200/80`).

2. **All Icons Have No Background by Default**:
   - Icons must render directly on the parent surface with **transparent background** (`bg-transparent border-0`).
   - Do NOT wrap icons in background shapes (e.g. no colored circles, squares, or gray backgrounds behind icons).
   - Examples:
     - Section flame/ribbon icon: pure SVG mark with no background box.
     - Currency `$`: plain text or raw icon with no black circle wrapper.
     - Action icons (Bookmark, MapPin, Briefcase, Utensils): transparent background as default.

