import React, { useState, useEffect, useRef } from 'react'
import { KANBAN_PRIORITIES, KANBAN_COLUMNS } from '../../utils/kanbanConstants'

export default function TaskModal({
  isOpen,
  mode = 'create',
  initialData = null,
  defaultStatus = 'todo',
  onClose,
  onSubmit
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState(defaultStatus)
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const titleInputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title || '')
        setDescription(initialData.description || '')
        setPriority(initialData.priority || 'medium')
        setStatus(initialData.status || defaultStatus)
        setDueDate(initialData.dueDate || '')
      } else {
        setTitle('')
        setDescription('')
        setPriority('medium')
        setStatus(defaultStatus)
        setDueDate('')
      }
      setErrors({})
      setTouched({})

      setTimeout(() => {
        titleInputRef.current?.focus()
      }, 50)
    }
  }, [isOpen, mode, initialData, defaultStatus])

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

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) {
      newErrors.title = 'Task title is required'
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ title: true })

    const formErrors = validate()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    const taskPayload = {
      ...(initialData || {}),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate: dueDate || null
    }

    onSubmit(taskPayload)
    onClose()
  }

  const handleQuickDate = (daysAhead) => {
    const date = new Date()
    date.setDate(date.getDate() + daysAhead)
    setDueDate(date.toISOString().split('T')[0])
  }

  return (
    <div className="kb-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="kb-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="kb-modal-header">
          <div className="kb-modal-title-group">
            <span className="kb-modal-icon">{mode === 'edit' ? '✏️' : '✨'}</span>
            <h2 className="kb-modal-title">
              {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
            </h2>
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

        <form onSubmit={handleSubmit} className="kb-modal-form" noValidate>
          {/* Title Input */}
          <div className="kb-form-group">
            <div className="kb-form-label-row">
              <label htmlFor="task-title" className="kb-form-label">
                Task Title <span className="text-danger">*</span>
              </label>
              <span className="kb-char-count">{title.length}/100</span>
            </div>
            <input
              id="task-title"
              ref={titleInputRef}
              type="text"
              className={`kb-form-input ${errors.title && touched.title ? 'kb-form-input--error' : ''}`}
              placeholder="e.g., Solve LRU Cache on LeetCode with HashMap & DLL"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({ ...errors, title: null })
              }}
              onBlur={() => setTouched({ ...touched, title: true })}
              maxLength={100}
              required
            />
            {errors.title && touched.title && (
              <span className="kb-form-error" role="alert">
                ⚠️ {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="kb-form-group">
            <label htmlFor="task-desc" className="kb-form-label">
              Description / Notes <span className="kb-form-sub">(Optional)</span>
            </label>
            <textarea
              id="task-desc"
              className="kb-form-textarea"
              rows="3"
              placeholder="Add key algorithms, edge cases, time/space complexity notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Column & Priority */}
          <div className="kb-form-grid">
            <div className="kb-form-group">
              <label htmlFor="task-status" className="kb-form-label">Column / Status</label>
              <select
                id="task-status"
                className="kb-form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {KANBAN_COLUMNS.map(col => (
                  <option key={col.id} value={col.id}>
                    {col.icon} {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="kb-form-group">
              <label htmlFor="task-priority" className="kb-form-label">Priority</label>
              <select
                id="task-priority"
                className="kb-form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {KANBAN_PRIORITIES.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.label} Priority
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date & Presets */}
          <div className="kb-form-group">
            <div className="kb-form-label-row">
              <label htmlFor="task-duedate" className="kb-form-label">
                Target Due Date <span className="kb-form-sub">(Optional)</span>
              </label>
              <div className="kb-quick-dates">
                <button
                  type="button"
                  className="kb-quick-date-btn"
                  onClick={() => handleQuickDate(0)}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="kb-quick-date-btn"
                  onClick={() => handleQuickDate(1)}
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  className="kb-quick-date-btn"
                  onClick={() => handleQuickDate(7)}
                >
                  +1 Week
                </button>
              </div>
            </div>
            <input
              id="task-duedate"
              type="date"
              className="kb-form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="kb-modal-footer">
            <button
              type="button"
              className="kb-btn kb-btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="kb-btn kb-btn--primary"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
