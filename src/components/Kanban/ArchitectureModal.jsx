import React, { useState, useEffect } from 'react'

export default function ArchitectureModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('components')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="kb-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="kb-modal-card kb-modal-card--lg" onClick={(e) => e.stopPropagation()}>
        <div className="kb-modal-header">
          <div className="kb-modal-title-group">
            <span className="kb-modal-icon">🧠</span>
            <div>
              <h2 className="kb-modal-title">PrepTrack Stage 2 — Architecture & Viva Guide</h2>
              <p className="kb-modal-sub">Component hierarchy, state flow, and 60-second demo script</p>
            </div>
          </div>
          <button
            type="button"
            className="kb-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div className="kb-arch-tabs">
          <button
            type="button"
            className={`kb-arch-tab ${activeTab === 'components' ? 'kb-arch-tab--active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            🧱 Component Hierarchy
          </button>
          <button
            type="button"
            className={`kb-arch-tab ${activeTab === 'state' ? 'kb-arch-tab--active' : ''}`}
            onClick={() => setActiveTab('state')}
          >
            ⚡ State Architecture
          </button>
          <button
            type="button"
            className={`kb-arch-tab ${activeTab === 'decisions' ? 'kb-arch-tab--active' : ''}`}
            onClick={() => setActiveTab('decisions')}
          >
            🎯 Key Decisions
          </button>
          <button
            type="button"
            className={`kb-arch-tab ${activeTab === 'demoscript' ? 'kb-arch-tab--active' : ''}`}
            onClick={() => setActiveTab('demoscript')}
          >
            🎥 60s Demo Video Script
          </button>
        </div>

        {/* Body Content */}
        <div className="kb-arch-body">
          {activeTab === 'components' && (
            <div className="kb-arch-section">
              <h3 className="kb-arch-heading">Dual-Stage Component Hierarchy</h3>
              <pre className="kb-code-display">
{`App.jsx (Root Coordinator)
 ├── Navbar.jsx (Logo, Active View Switcher: Tracker vs Kanban Stage 2)
 ├── [View 1] Stage 1: QuestionTracker & Dashboard
 │    ├── Hero.jsx (Hero banner)
 │    ├── Dashboard.jsx (Progress rings & category breakdown)
 │    └── QuestionTracker.jsx (Questions list, category & status filters)
 ├── [View 2] Stage 2: Kanban Board (Week 2 Upgrade)
 │    ├── KanbanStats.jsx (Sprint metrics, progress bar, viva guide button)
 │    ├── KanbanFilterBar.jsx (Live title search, priority select, status pills)
 │    └── KanbanBoard.jsx (3-Column grid & mobile responsive tabs)
 │         └── KanbanColumn.jsx (Column header, count pill, HTML5 drop zone)
 │              ├── TaskCard.jsx (Priority badge, due date tag, quick move menu)
 │              └── EmptyState.jsx (Column & zero-results state)
 ├── TaskModal.jsx (Validated task creation & editing)
 ├── DeleteConfirmModal.jsx (Defensive deletion confirmation)
 └── ArchitectureModal.jsx (This interactive guide)`}
              </pre>

              <div className="kb-arch-cards-grid">
                <div className="kb-arch-card">
                  <h4>💡 Unidirectional Flow</h4>
                  <p>State mutations (add, edit, delete, status transitions) live in <code>App.jsx</code> and cascade down via pure callback props.</p>
                </div>
                <div className="kb-arch-card">
                  <h4>🧩 Progressive Stage 2 Upgrade</h4>
                  <p>Preserves Stage 1's Question Tracker while introducing Stage 2's Kanban board, letting evaluators test both workflows.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'state' && (
            <div className="kb-arch-section">
              <h3 className="kb-arch-heading">State Management & Persistence</h3>
              <div className="kb-arch-points">
                <div className="kb-arch-point">
                  <span className="kb-arch-point-num">1</span>
                  <div>
                    <strong>Dual LocalStorage Persistence:</strong>
                    <p>Stage 1 questions are stored in <code>'preptrack_questions_list'</code> and Stage 2 Kanban tasks in <code>'preptrack_kanban_tasks_v1'</code>. Both utilize our reusable <code>useLocalStorage</code> hook with JSON parsing safeguards.</p>
                  </div>
                </div>

                <div className="kb-arch-point">
                  <span className="kb-arch-point-num">2</span>
                  <div>
                    <strong>Reactive Derived State (`useMemo`):</strong>
                    <p>Filtered tasks are computed reactively from <code>kanbanSearchTerm</code>, <code>kanbanPriorityFilter</code>, and <code>kanbanStatusFilter</code>, eliminating stale state desynchronization.</p>
                  </div>
                </div>

                <div className="kb-arch-point">
                  <span className="kb-arch-point-num">3</span>
                  <div>
                    <strong>Computed Metrics:</strong>
                    <p>Overdue indicators and sprint completion percentages are derived on-the-fly from task arrays, ensuring zero calculation drift.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="kb-arch-section">
              <h3 className="kb-arch-heading">Key Architectural Decisions</h3>
              <div className="kb-decisions-list">
                <div className="kb-decision-item">
                  <h4>1. Drag & Drop with Mobile Fallback</h4>
                  <p>Native HTML5 Drag and Drop eliminates heavy 3rd-party library dependencies (under 50KB bundle). Paired with an accessible <strong>"↔ Move"</strong> dropdown menu so mobile touchscreen users have 100% feature parity.</p>
                </div>

                <div className="kb-decision-item">
                  <h4>2. Mobile Responsive Tab Switcher</h4>
                  <p>On small screens, the Kanban board features responsive tab pills (<code>All Columns</code>, <code>To Do</code>, <code>In Progress</code>, <code>Completed</code>) to prevent cramped, unreadable vertical layouts.</p>
                </div>

                <div className="kb-decision-item">
                  <h4>3. Smart Due Date Relative Badges</h4>
                  <p>Computes relative status: <strong>"Overdue (2d ago)"</strong> in alert red, <strong>"Due Today"</strong> in amber, and upcoming dates with clear badges.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demoscript' && (
            <div className="kb-arch-section">
              <h3 className="kb-arch-heading">60-Second Demo Video Script</h3>
              <ol className="kb-demo-steps">
                <li>
                  <strong>Intro (0:00 - 0:10):</strong> "Hello! This is PrepTrack Stage 2, upgraded with a fully responsive Kanban Board for interview preparation."
                </li>
                <li>
                  <strong>Kanban Columns & Drag/Drop (0:10 - 0:25):</strong> "We have three distinct columns: To Do, In Progress, and Completed. Tasks can be dragged and dropped smoothly across columns, or moved via the quick 'Move' dropdown on mobile screens."
                </li>
                <li>
                  <strong>Task CRUD & Validation (0:25 - 0:40):</strong> "Clicking 'Add Task' opens a validated modal for title, notes, priority levels, and due date presets. We can also edit or safely delete any task."
                </li>
                <li>
                  <strong>Search, Filter & Persistence (0:40 - 0:55):</strong> "We have live search by title, priority filtering, and status pills. Refreshing the browser preserves all data in LocalStorage."
                </li>
                <li>
                  <strong>Wrap-up (0:55 - 1:00):</strong> "Users can toggle between the Stage 1 Question Tracker and Stage 2 Kanban Board anytime. Thank you!"
                </li>
              </ol>
            </div>
          )}
        </div>

        <div className="kb-modal-footer">
          <button
            type="button"
            className="kb-btn kb-btn--primary"
            onClick={onClose}
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  )
}
