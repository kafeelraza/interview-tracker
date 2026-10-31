export const KANBAN_STORAGE_KEY = 'preptrack_kanban_tasks_v1'

export const KANBAN_COLUMNS = [
  {
    id: 'todo',
    title: 'To Do',
    description: 'Upcoming interview prep tasks',
    accentColor: '#6366f1',
    accentBg: 'rgba(99, 102, 241, 0.12)',
    icon: '📋'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    description: 'Actively solving or practicing',
    accentColor: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    icon: '⚡'
  },
  {
    id: 'completed',
    title: 'Completed',
    description: 'Mastered and revised topics',
    accentColor: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    icon: '✅'
  }
]

export const KANBAN_PRIORITIES = [
  {
    id: 'urgent',
    label: 'Urgent',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
    badgeText: '#991b1b'
  },
  {
    id: 'high',
    label: 'High',
    color: '#ea580c',
    bg: '#fff7ed',
    border: '#fed7aa',
    badgeText: '#9a3412'
  },
  {
    id: 'medium',
    label: 'Medium',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    badgeText: '#1e40af'
  },
  {
    id: 'low',
    label: 'Low',
    color: '#059669',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    badgeText: '#065f46'
  }
]

export const INITIAL_KANBAN_TASKS = [
  {
    id: 'kb-task-1',
    title: 'System Design: Scalable URL Shortener (TinyURL)',
    description: 'Cover hashing vs base62, database schema, caching with Redis, and 100M DAU scaling.',
    status: 'in-progress',
    priority: 'urgent',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'kb-task-2',
    title: 'Tree Traversals & Lowest Common Ancestor',
    description: 'Review iterative DFS with Stack, Morris traversal, and LCA in Binary Search Tree.',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'kb-task-3',
    title: 'Behavioral STAR Method Stories (Conflict & Leadership)',
    description: 'Draft 4 concrete examples: handling disagreement on tech stack, tight deadline delivery.',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'kb-task-4',
    title: 'React Performance: useCallback, useMemo & Virtualization',
    description: 'Solve list lag using windowing (react-window) and profiling rendering with React DevTools.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'kb-task-5',
    title: 'Git Internals: Plumbing Commands & Reflog Recovery',
    description: 'Understood blobs, trees, commit objects, and recovering detached HEAD with git reflog.',
    status: 'completed',
    priority: 'low',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
]
