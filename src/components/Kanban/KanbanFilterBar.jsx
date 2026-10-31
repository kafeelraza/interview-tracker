import React from 'react'
import { KANBAN_PRIORITIES, KANBAN_COLUMNS } from '../../utils/kanbanConstants'

export default function KanbanFilterBar({
  searchQuery,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  totalTasks,
  filteredCount
}) {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedPriority !== 'all' || selectedStatus !== 'all'

  return (
    <div className="kb-filter-bar">
      <div className="kb-filter-container">
        {/* Live Search */}
        <div className="kb-search-box">
          <span className="kb-search-icon">🔍</span>
          <input
            type="text"
            className="kb-search-input"
            placeholder="Search tasks by title or details..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search Kanban tasks"
          />
          {searchQuery && (
            <button
              type="button"
              className="kb-search-clear"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <div className="kb-filter-select-group">
          <label htmlFor="kb-priority-select" className="kb-filter-label">Priority:</label>
          <select
            id="kb-priority-select"
            className="kb-select-input"
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="all">All Priorities</option>
            {KANBAN_PRIORITIES.map(p => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter Pills */}
        <div className="kb-status-pills">
          <button
            type="button"
            className={`kb-pill ${selectedStatus === 'all' ? 'kb-pill--active' : ''}`}
            onClick={() => onStatusChange('all')}
          >
            All
          </button>
          {KANBAN_COLUMNS.map(col => (
            <button
              key={col.id}
              type="button"
              className={`kb-pill ${selectedStatus === col.id ? 'kb-pill--active' : ''}`}
              onClick={() => onStatusChange(col.id)}
            >
              <span>{col.icon}</span>
              <span>{col.title}</span>
            </button>
          ))}
        </div>

        {/* Results summary & Reset */}
        <div className="kb-filter-meta">
          <span className="kb-results-count">
            Showing <strong>{filteredCount}</strong> of <strong>{totalTasks}</strong>
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              className="kb-clear-btn"
              onClick={onResetFilters}
              title="Reset search and filters"
            >
              Clear Filters ↺
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
