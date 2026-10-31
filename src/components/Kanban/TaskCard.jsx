import React, { useState } from 'react'
import { KANBAN_PRIORITIES, KANBAN_COLUMNS } from '../../utils/kanbanConstants'
import { formatDueDate } from '../../utils/kanbanHelpers'

export default function TaskCard({
  task,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDragStart,
  onDragEnd
}) {
  const [isMoveOpen, setIsMoveOpen] = useState(false)
  const priorityInfo = KANBAN_PRIORITIES.find(p => p.id === task.priority) || KANBAN_PRIORITIES[2]
  const dueDateInfo = formatDueDate(task.dueDate)
  const targetColumns = KANBAN_COLUMNS.filter(c => c.id !== task.status)

  return (
    <article
      className="kb-card"
      draggable="true"
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      tabIndex="0"
    >
      {/* Top Header: Priority Badge + Quick Menu */}
      <div className="kb-card__header">
        <span
          className="kb-priority-badge"
          style={{
            backgroundColor: priorityInfo.bg,
            color: priorityInfo.badgeText,
            borderColor: priorityInfo.border
          }}
        >
          <span className="kb-priority-dot" style={{ backgroundColor: priorityInfo.color }} />
          {priorityInfo.label}
        </span>

        {/* Quick Move Dropdown (Mobile & Keyboard accessibility) */}
        <div className="kb-card__quick-move">
          <button
            type="button"
            className="kb-move-trigger"
            onClick={() => setIsMoveOpen(!isMoveOpen)}
            title="Move task to another column"
            aria-expanded={isMoveOpen}
          >
            ↔ Move
          </button>

          {isMoveOpen && (
            <div className="kb-quick-menu" onMouseLeave={() => setIsMoveOpen(false)}>
              <span className="kb-quick-menu-title">Move to:</span>
              {targetColumns.map(col => (
                <button
                  key={col.id}
                  type="button"
                  className="kb-quick-menu-item"
                  onClick={() => {
                    onMoveTask(task.id, col.id)
                    setIsMoveOpen(false)
                  }}
                >
                  <span>{col.icon}</span>
                  <span>{col.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Title */}
      <h3 className="kb-card__title" title={task.title}>
        {task.title}
      </h3>

      {/* Description Preview */}
      {task.description && (
        <p className="kb-card__desc">
          {task.description}
        </p>
      )}

      {/* Card Footer: Due Date Badge & Actions */}
      <div className="kb-card__footer">
        {dueDateInfo ? (
          <span
            className={`kb-due-badge kb-due-badge--${dueDateInfo.status}`}
            style={{
              backgroundColor: dueDateInfo.bg,
              color: dueDateInfo.color
            }}
            title={`Due date: ${dueDateInfo.formattedDate}`}
          >
            <span>📅</span>
            <span>{dueDateInfo.label}</span>
          </span>
        ) : (
          <span className="kb-due-badge kb-due-badge--none">No date</span>
        )}

        <div className="kb-card__actions">
          <button
            type="button"
            className="kb-action-btn"
            onClick={() => onEditTask(task)}
            title="Edit task"
            aria-label={`Edit ${task.title}`}
          >
            ✏️
          </button>
          <button
            type="button"
            className="kb-action-btn kb-action-btn--delete"
            onClick={() => onDeleteTask(task)}
            title="Delete task"
            aria-label={`Delete ${task.title}`}
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  )
}
