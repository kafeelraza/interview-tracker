import React, { useEffect } from 'react'

export default function DeleteConfirmModal({
  isOpen,
  task,
  onClose,
  onConfirm
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !task) return null

  return (
    <div className="kb-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="kb-modal-card kb-modal-card--sm" onClick={(e) => e.stopPropagation()}>
        <div className="kb-modal-header">
          <div className="kb-modal-title-group">
            <span className="kb-modal-icon text-danger">🗑️</span>
            <h2 className="kb-modal-title">Delete Task?</h2>
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

        <div className="kb-modal-body">
          <p className="kb-delete-warning">
            Are you sure you want to remove this task from your sprint board?
          </p>
          <div className="kb-delete-preview">
            <strong className="kb-delete-title">{task.title}</strong>
            {task.description && (
              <p className="kb-delete-desc">{task.description}</p>
            )}
          </div>
        </div>

        <div className="kb-modal-footer">
          <button
            type="button"
            className="kb-btn kb-btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="kb-btn kb-btn--danger"
            onClick={() => onConfirm(task.id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  )
}
