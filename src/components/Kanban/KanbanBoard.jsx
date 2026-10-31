import React, { useState } from 'react'
import { KANBAN_COLUMNS } from '../../utils/kanbanConstants'
import KanbanColumn from './KanbanColumn'

export default function KanbanBoard({
  tasks,
  allTasksCount,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDropTask,
  onResetFilters,
  hasActiveFilters
}) {
  const [mobileActiveTab, setMobileActiveTab] = useState('all')
  const [draggedTaskId, setDraggedTaskId] = useState(null)

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedTaskId(taskId)
  }

  const handleDragEnd = () => {
    setDraggedTaskId(null)
  }

  const visibleColumns = mobileActiveTab === 'all'
    ? KANBAN_COLUMNS
    : KANBAN_COLUMNS.filter(c => c.id === mobileActiveTab)

  // Empty state handling
  if (allTasksCount === 0) {
    return (
      <div className="kb-global-empty">
        <div className="kb-global-empty__icon">📋</div>
        <h3 className="kb-global-empty__title">Your Kanban board is clear</h3>
        <p className="kb-global-empty__desc">
          Organize your interview preparation by adding your first task to the board, or restore sample tasks anytime.
        </p>
        <button
          type="button"
          className="kb-btn kb-btn--primary"
          onClick={() => onAddTask('todo')}
        >
          ＋ Create First Task
        </button>
      </div>
    )
  }

  if (tasks.length === 0 && hasActiveFilters) {
    return (
      <div className="kb-global-empty">
        <div className="kb-global-empty__icon">🔍</div>
        <h3 className="kb-global-empty__title">No matching tasks found</h3>
        <p className="kb-global-empty__desc">
          No tasks match your active search query or priority/status filters.
        </p>
        <button
          type="button"
          className="kb-btn kb-btn--secondary"
          onClick={onResetFilters}
        >
          Clear Filters & Search
        </button>
      </div>
    )
  }

  return (
    <div className="kb-board-container">
      {/* Mobile Column Navigation Tabs */}
      <div className="kb-mobile-tabs" role="tablist" aria-label="Kanban columns">
        <button
          type="button"
          role="tab"
          aria-selected={mobileActiveTab === 'all'}
          className={`kb-mobile-tab ${mobileActiveTab === 'all' ? 'kb-mobile-tab--active' : ''}`}
          onClick={() => setMobileActiveTab('all')}
        >
          <span>All Columns</span>
          <span className="kb-mobile-tab__badge">{tasks.length}</span>
        </button>

        {KANBAN_COLUMNS.map(col => {
          const colTasksCount = tasks.filter(t => t.status === col.id).length
          return (
            <button
              key={col.id}
              type="button"
              role="tab"
              aria-selected={mobileActiveTab === col.id}
              className={`kb-mobile-tab ${mobileActiveTab === col.id ? 'kb-mobile-tab--active' : ''}`}
              onClick={() => setMobileActiveTab(col.id)}
            >
              <span>{col.icon} {col.title}</span>
              <span className="kb-mobile-tab__badge">{colTasksCount}</span>
            </button>
          )
        })}
      </div>

      {/* 3 Columns Grid */}
      <div className="kb-grid" data-drag-active={draggedTaskId !== null}>
        {visibleColumns.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id)
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={columnTasks}
              onAddTask={onAddTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDropTask={onDropTask}
            />
          )
        })}
      </div>
    </div>
  )
}
