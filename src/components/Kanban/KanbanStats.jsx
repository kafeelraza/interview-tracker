import React from 'react'
import { formatDueDate, calculateKanbanProgress } from '../../utils/kanbanHelpers'

export default function KanbanStats({
  tasks,
  selectedStatus,
  onSelectStatus,
  onOpenArchitectureModal,
  onOpenAddModal
}) {
  const total = tasks.length
  const todoCount = tasks.filter(t => t.status === 'todo').length
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length
  const completedCount = tasks.filter(t => t.status === 'completed').length
  const progress = calculateKanbanProgress(tasks)

  const overdueCount = tasks.filter(t => {
    if (t.status === 'completed' || !t.dueDate) return false
    const info = formatDueDate(t.dueDate)
    return info && info.status === 'overdue'
  }).length

  const stats = [
    {
      id: 'all',
      label: 'All Tasks',
      count: total,
      icon: '📊',
      color: '#3b82f6',
      bg: '#eff6ff',
      active: selectedStatus === 'all'
    },
    {
      id: 'todo',
      label: 'To Do',
      count: todoCount,
      icon: '📋',
      color: '#6366f1',
      bg: '#eef2ff',
      active: selectedStatus === 'todo'
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      count: inProgressCount,
      icon: '⚡',
      color: '#f59e0b',
      bg: '#fffbeb',
      active: selectedStatus === 'in-progress'
    },
    {
      id: 'completed',
      label: 'Completed',
      count: completedCount,
      icon: '✅',
      color: '#10b981',
      bg: '#ecfdf5',
      active: selectedStatus === 'completed'
    }
  ]

  return (
    <div className="kb-stats-section">
      <div className="kb-header-row">
        <div>
          <div className="kb-badge-row">
            <span className="kb-pill-badge">Week 2 Upgrade</span>
            <span className="kb-stage-badge">Stage 2</span>
          </div>
          <h2 className="kb-section-title">Sprint Kanban Board</h2>
          <p className="kb-section-desc">Manage interview practice tasks across To Do, In Progress, and Completed columns</p>
        </div>

        <div className="kb-header-actions">
          <button
            type="button"
            className="kb-btn kb-btn--guide"
            onClick={onOpenArchitectureModal}
            title="View Component Structure & State Architecture for Demo/Viva"
          >
            <span>🧠</span>
            <span>Architecture & Viva Guide</span>
          </button>

          <button
            type="button"
            className="kb-btn kb-btn--primary"
            onClick={onOpenAddModal}
          >
            <span>＋</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="kb-progress-box">
        <div className="kb-progress-header">
          <span className="kb-progress-title">Sprint Completion</span>
          <span className="kb-progress-stat">
            {completedCount} of {total} tasks ({progress}%)
          </span>
        </div>
        <div className="kb-progress-track">
          <div className="kb-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="kb-stats-grid">
        {stats.map(stat => (
          <button
            key={stat.id}
            type="button"
            className={`kb-stat-card ${stat.active ? 'kb-stat-card--active' : ''}`}
            onClick={() => onSelectStatus(stat.id)}
            title={`Filter by ${stat.label}`}
          >
            <div className="kb-stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="kb-stat-info">
              <span className="kb-stat-label">{stat.label}</span>
              <span className="kb-stat-count">{stat.count}</span>
            </div>
          </button>
        ))}

        {overdueCount > 0 && (
          <div className="kb-stat-card kb-stat-card--alert">
            <div className="kb-stat-icon kb-stat-icon--alert">⚠️</div>
            <div className="kb-stat-info">
              <span className="kb-stat-label">Attention</span>
              <span className="kb-stat-count text-danger">{overdueCount} Overdue</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
