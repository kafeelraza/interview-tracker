# 📋 PrepTrack — Interview Practice Tracker

A responsive, single-page dashboard where students can track their weekly interview preparation progress. Built with **React 18 + Vite** — no backend required, all data persisted via LocalStorage.

![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white)
![Deployment](https://img.shields.io/badge/Vercel-Live-brightgreen?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

🔗 **Live Deployed App:** [https://interview-tracker-six.vercel.app](https://interview-tracker-six.vercel.app)

---

## ✨ Features

### Dashboard Overview
- **Total Questions** — count of all tracked questions
- **DSA Completed** — completed DSA-category problems
- **Interview Ready** — all completed questions across categories
- **Machine Coding Status** — progress on machine coding challenges (X/Y format)
- **Progress Ring** — animated SVG circular progress indicator showing overall completion %

### Question Tracker
- ➕ Add questions with **title**, **category** (DSA / Git / Technical / Machine Coding), **difficulty** (Easy / Medium / Hard), **status** (Pending / In Progress / Completed), and optional **notes**
- ✏️ Edit existing questions inline via modal
- 🗑️ Delete questions with one click
- 🔄 Quick status toggle — change status directly from the question card

### Search & Filters
- 🔍 Real-time search by title or notes
- 📂 Filter by **category**, **status**, and **difficulty** independently
- 🧹 Clear all filters with one click
- Shows filtered count vs. total count

### Data Persistence
- 💾 All data stored in **LocalStorage** — survives page refresh and browser restart
- No server, no database, no signup required

### Responsive Design
- 📱 Fully responsive — desktop, tablet, and mobile layouts
- Hamburger navigation menu on mobile
- Grid layout adapts from 2-column to single-column

### Edge Case Handling
- 📭 **Empty state** — friendly illustration + CTA when no questions exist
- 🔎 **No results state** — clear message when filters/search return nothing
- ✅ **Form validation** — required fields with inline error messages
- ⌨️ **Keyboard support** — Escape closes modals, focus management

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 16.x
- **npm** ≥ 8.x (or yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/preptrack.git
cd preptrack

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

The optimized build will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Live Deployment Guide (Free & Instant)

You can deploy this project in under 2 minutes using any of these options:

### Option 1: Vercel (Recommended — 1 Click)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repo — Vercel will automatically detect **Vite** with build command `npm run build` and output directory `dist`.
4. Click **Deploy**. Your live URL will be ready in ~30 seconds!

### Option 2: Netlify Drop (No CLI or Git required)
1. Run `npm run build` locally in the project directory.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder directly into your browser.
4. Netlify will instantly provide a live HTTPS URL!

---

## 🏗️ Project Structure

```
src/
├── main.jsx                    # React entry point
├── index.css                   # Global styles, CSS variables, reset
├── App.jsx                     # Main app component (state management)
├── App.css                     # App layout styles
├── hooks/
│   └── useLocalStorage.js      # Custom hook for localStorage persistence
├── utils/
│   └── constants.js            # Categories, difficulties, statuses, colors
└── components/
    ├── Navbar.jsx / .css       # Responsive navigation bar
    ├── Hero.jsx / .css         # Landing hero section with gradient
    ├── Dashboard.jsx / .css    # Stats cards + progress ring
    ├── ProgressRing.jsx        # SVG circular progress indicator
    ├── QuestionTracker.jsx/.css # Main tracker section wrapper
    ├── QuestionCard.jsx / .css # Individual question card
    ├── Filters.jsx / .css      # Search input + filter dropdowns
    ├── AddQuestionModal.jsx/.css # Add/Edit question modal with validation
    ├── EmptyState.jsx / .css   # Empty & no-results states
    └── Footer.jsx / .css       # Page footer
```

---

## 🎨 Design Decisions

- **No UI framework** — Pure CSS with custom properties for a lightweight, unique look
- **BEM naming convention** — `.component__element--modifier` for maintainable CSS
- **Inter font** — Clean, professional typeface loaded from Google Fonts
- **Color-coded badges** — Category, difficulty, and status each have distinct color palettes for quick visual scanning
- **CSS animations** — Subtle fadeIn, scaleIn, and float animations for polish without excess
- **Accessibility** — ARIA labels, roles, keyboard navigation, focus indicators

---

## 📝 Assumptions

1. This is a **client-side only** application — no backend or API integration
2. Data is stored in the browser's **LocalStorage** — clearing browser data will reset all questions
3. The app is designed for **individual use** — no multi-user or authentication features
4. Categories are fixed to: **DSA**, **Git**, **Technical**, **Machine Coding** (as per requirements)
5. **Machine Coding** is treated as a category within the question tracker, with dashboard showing its specific progress

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework with hooks |
| Vite 5 | Build tool & dev server |
| CSS Custom Properties | Design system & theming |
| LocalStorage API | Client-side data persistence |
| Google Fonts (Inter) | Typography |

---

## 📄 License

MIT License — feel free to use and modify.
