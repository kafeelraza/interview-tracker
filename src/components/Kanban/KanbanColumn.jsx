import React, { useState } from 'react'
import TaskCard from './TaskCard'

export default function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onDragStart,
  onDragEnd,
  onDropTask
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const taskId = e.dataTransfer.getData('text/plain')
    if (taskId) {
      onDropTask(taskId, column.id)
    }
  }

  return (
    <section
      className={`kb-column ${isDragOver ? 'kb-column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={`${column.title} column`}
    >
      {/* Column Header */}
      <div className="kb-column__header" style={{ borderTopColor: column.accentColor }}>
        <div className="kb-column__title-group">
          <span className="kb-column__icon">{column.icon}</span>
          <h3 className="kb-column__title">{column.title}</h3>
          <span
            className="kb-column__count"
            style={{ backgroundColor: column.accentBg, color: column.accentColor }}
          >
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          className="kb-column__add-btn"
          onClick={() => onAddTask(column.id)}
          title={`Add task to ${column.title}`}
          aria-label={`Add task to ${column.title}`}
        >
          ＋
        </button>
      </div>

      {/* Task List or Column Empty State */}
      <div className="kb-column__content">
        {tasks.length === 0 ? (
          <div className="kb-column-empty">
            <span className="kb-column-empty__icon">📥</span>
            <p className="kb-column-empty__text">No tasks in <strong>{column.title}</strong></p>
            <button
              type="button"
              className="kb-column-empty__btn"
              onClick={() => onAddTask(column.id)}
            >
              ＋ Add to {column.title}
            </button>
          </div>
        ) : (
          <div className="kb-column__task-list">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
                onMoveTask={onMoveTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
