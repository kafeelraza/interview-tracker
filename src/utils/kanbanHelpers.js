/**
 * Generate unique task ID
 */
export function generateKanbanId() {
  return 'kb-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7)
}

/**
 * Format due date with friendly human-readable relative badges:
 * - Overdue (red)
 * - Due Today (orange)
 * - Due Tomorrow (amber)
 * - Upcoming date
 */
export function formatDueDate(dateString) {
  if (!dateString) return null

  const targetDate = new Date(dateString + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - today.getTime()
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

  const formattedDate = targetDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: targetDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
  })

  if (diffDays < 0) {
    const daysAgo = Math.abs(diffDays)
    return {
      label: daysAgo === 1 ? 'Overdue (Yesterday)' : `Overdue (${daysAgo}d ago)`,
      formattedDate,
      status: 'overdue',
      color: '#dc2626',
      bg: '#fee2e2'
    }
  }

  if (diffDays === 0) {
    return {
      label: 'Due Today',
      formattedDate,
      status: 'today',
      color: '#d97706',
      bg: '#fef3c7'
    }
  }

  if (diffDays === 1) {
    return {
      label: 'Due Tomorrow',
      formattedDate,
      status: 'tomorrow',
      color: '#b45309',
      bg: '#fef3c7'
    }
  }

  return {
    label: `Due ${formattedDate}`,
    formattedDate,
    status: 'upcoming',
    color: '#4b5563',
    bg: '#f3f4f6'
  }
}

/**
 * Calculate completion percentage for Kanban tasks
 */
export function calculateKanbanProgress(tasks) {
  if (!tasks || tasks.length === 0) return 0
  const completedCount = tasks.filter(t => t.status === 'completed').length
  return Math.round((completedCount / tasks.length) * 100)
}
