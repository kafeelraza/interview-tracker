# 📋 PrepTrack — Interview Practice Tracker

A responsive, single-page dashboard where students can track their weekly interview preparation progress. Built with **React 18 + Vite** — no backend required, all data persisted via LocalStorage.

![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?logo=vite&logoColor=white)
![Deployment](https://img.shields.io/badge/Vercel-Live-brightgreen?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

🔗 **Live Deployed App:** [https://interview-tracker-six.vercel.app](https://interview-tracker-six.vercel.app)

---

## ✨ Features

### 📌 Stage 2 Upgrade: Responsive Kanban Board (Week 2)
- **3 Dynamic Columns** — `To Do`, `In Progress`, and `Completed` columns with per-column task counters.
- **HTML5 Drag & Drop** — Smooth card dragging across columns with animated drop-target glow.
- **Mobile Touch "↔ Move" Menu** — Accessible dropdown on every card so mobile users can transition tasks with 1 tap.
- **Task CRUD** — Add tasks with validated title, description, priority (`Urgent`, `High`, `Medium`, `Low`), and due date with quick presets (*Today*, *Tomorrow*, *+1 Week*).
- **Edit & Delete** — Pre-filled edit modal and defensive deletion confirmation modal with preview.
- **Search & Multi-Filter** — Real-time search by task title/details + Priority dropdown + Status pills.
- **Due Date Badges** — Dynamic relative status: **"Overdue (2d ago)"**, **"Due Today"**, and upcoming date tags.
- **Dual LocalStorage Persistence** — Independent LocalStorage key (`preptrack_kanban_tasks_v1`) preserving tasks across reloads.
- **🧠 Architecture & Viva Guide Modal** — Built directly into the app header with component hierarchy, state flow, key decisions, and a **60-second demo video recording script**.

### 📋 Stage 1: Question Practice Tracker (Week 1)
- **Dashboard Overview** — Total questions, DSA completed, interview ready count, and SVG circular progress ring.
- **Categorized Question Tracker** — Questions by category (DSA, Git, Technical, Machine Coding), difficulty (Easy, Medium, Hard), and status.
- **Multi-Filter & Search** — Filter by category, status, and difficulty with clear all filters CTA.
- **Clean Persistence** — Stored under LocalStorage key `preptrack_questions_list`.

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
