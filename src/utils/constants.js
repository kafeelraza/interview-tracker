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

export const DEFAULT_QUESTIONS = [
  {
    id: 'seed-1',
    title: 'Two Sum & 3-Sum (Hash Map + Two Pointers)',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Completed',
    notes: 'Used Map for O(n) lookup in Two Sum. For 3-Sum, sorted array first and used two pointers with duplicate skipping.',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-2',
    title: 'Interactive Rebase & Resolving Merge Conflicts',
    category: 'Git',
    difficulty: 'Medium',
    status: 'Completed',
    notes: 'Practiced git rebase -i HEAD~4, squashing commits, rewording commit messages, and resolving conflict markers cleanly.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-3',
    title: 'JavaScript Event Loop, Microtasks & Promises',
    category: 'Technical',
    difficulty: 'Medium',
    status: 'Completed',
    notes: 'Covered call stack, Web APIs, task queue vs microtask queue (Promise.then vs setTimeout order of execution).',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-4',
    title: 'Typeahead / Autocomplete Search with Debounce & Cache',
    category: 'Machine Coding',
    difficulty: 'Medium',
    status: 'In Progress',
    notes: 'Built custom debounce hook (300ms), keyboard navigation (up/down arrow keys), highlight matching terms, and LRU cache.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-5',
    title: 'LRU Cache with Doubly Linked List & Map',
    category: 'DSA',
    difficulty: 'Hard',
    status: 'In Progress',
    notes: 'O(1) get and put using HashMap + Doubly Linked List with dummy head and tail nodes to simplify pointer adjustments.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-6',
    title: 'Kanban Task Board with Drag & Drop',
    category: 'Machine Coding',
    difficulty: 'Hard',
    status: 'Pending',
    notes: 'Multi-column workflow with HTML5 Drag and Drop API, column reordering, and optimistic UI updates.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-7',
    title: 'Git Cherry-pick, Stash & Bisect for Debugging',
    category: 'Git',
    difficulty: 'Easy',
    status: 'Pending',
    notes: 'Used git bisect to binary-search regression commits. Practiced git stash pop and cherry-picking hotfix commits.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'seed-8',
    title: 'Browser Rendering Pipeline & Core Web Vitals',
    category: 'Technical',
    difficulty: 'Medium',
    status: 'Completed',
    notes: 'DOM/CSSOM -> Render Tree -> Layout (Reflow) -> Paint -> Composite. Optimizing LCP, FID/INP, and CLS.',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
]
