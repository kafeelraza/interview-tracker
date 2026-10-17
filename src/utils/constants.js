export const CATEGORIES = ['DSA', 'Git', 'Technical', 'Machine Coding']

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

export const STATUSES = ['Pending', 'In Progress', 'Completed']

export const CATEGORY_COLORS = {
  'DSA': { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
  'Git': { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  'Technical': { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  'Machine Coding': { bg: '#FEF9C3', text: '#854D0E', border: '#FEF08A' }
}

export const DIFFICULTY_COLORS = {
  'Easy': { bg: '#D1FAE5', text: '#065F46' },
  'Medium': { bg: '#FEF3C7', text: '#92400E' },
  'Hard': { bg: '#FEE2E2', text: '#991B1B' }
}

export const STATUS_COLORS = {
  'Pending': { bg: '#F8FAFC', text: '#475569' },
  'In Progress': { bg: '#FEF3C7', text: '#92400E' },
  'Completed': { bg: '#D1FAE5', text: '#065F46' }
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}
