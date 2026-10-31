import { useState, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generateId } from './utils/constants'
import {
  KANBAN_STORAGE_KEY,
  INITIAL_KANBAN_TASKS
} from './utils/kanbanConstants'
import { generateKanbanId } from './utils/kanbanHelpers'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import QuestionTracker from './components/QuestionTracker'
import AddQuestionModal from './components/AddQuestionModal'
import Footer from './components/Footer'

// Kanban Stage 2 Components
import KanbanStats from './components/Kanban/KanbanStats'
import KanbanFilterBar from './components/Kanban/KanbanFilterBar'
import KanbanBoard from './components/Kanban/KanbanBoard'
import TaskModal from './components/Kanban/TaskModal'
import DeleteConfirmModal from './components/Kanban/DeleteConfirmModal'
import ArchitectureModal from './components/Kanban/ArchitectureModal'

import './App.css'
import './components/Kanban/Kanban.css'

/**
 * Main application component for PrepTrack (Stage 1 + Stage 2 Upgrade)
 * Supports both Question Tracker (Stage 1) and Kanban Board (Stage 2)
 */
function App() {
  // -------------------------------------------------------------
  // Stage 1: Question Tracker State
  // -------------------------------------------------------------
  const [questions, setQuestions] = useLocalStorage('preptrack_questions_list', [])
  const [activeView, setActiveView] = useState('kanban') // 'home' | 'tracker' | 'kanban'
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    difficulty: ''
  })

  // -------------------------------------------------------------
  // Stage 2: Kanban Board State
  // -------------------------------------------------------------
  const [kanbanTasks, setKanbanTasks] = useLocalStorage(KANBAN_STORAGE_KEY, INITIAL_KANBAN_TASKS)
  const [kanbanSearch, setKanbanSearch] = useState('')
  const [kanbanPriority, setKanbanPriority] = useState('all')
  const [kanbanStatus, setKanbanStatus] = useState('all')

  const [taskModalState, setTaskModalState] = useState({
    isOpen: false,
    mode: 'create',
    task: null,
    defaultStatus: 'todo'
  })
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    task: null
  })
  const [isArchModalOpen, setIsArchModalOpen] = useState(false)

  // -------------------------------------------------------------
  // Filtered Questions (Stage 1)
  // -------------------------------------------------------------
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.notes && q.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = !filters.category || q.category === filters.category
      const matchesStatus = !filters.status || q.status === filters.status
      const matchesDifficulty = !filters.difficulty || q.difficulty === filters.difficulty
      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
    })
  }, [questions, searchTerm, filters])

  // -------------------------------------------------------------
  // Filtered Kanban Tasks (Stage 2)
  // -------------------------------------------------------------
  const filteredKanbanTasks = useMemo(() => {
    return kanbanTasks.filter(task => {
      if (kanbanSearch.trim()) {
        const query = kanbanSearch.toLowerCase().trim()
        const matchTitle = task.title.toLowerCase().includes(query)
        const matchDesc = task.description && task.description.toLowerCase().includes(query)
        if (!matchTitle && !matchDesc) return false
      }

      if (kanbanPriority !== 'all' && task.priority !== kanbanPriority) {
        return false
      }

      if (kanbanStatus !== 'all' && task.status !== kanbanStatus) {
        return false
      }

      return true
    })
  }, [kanbanTasks, kanbanSearch, kanbanPriority, kanbanStatus])

  // -------------------------------------------------------------
  // Stage 1 Handlers
  // -------------------------------------------------------------
  const handleAddQuestion = (questionData) => {
    if (editingQuestion) {
      setQuestions(prev => prev.map(q =>
        q.id === editingQuestion.id
          ? { ...q, ...questionData, updatedAt: new Date().toISOString() }
          : q
      ))
      setEditingQuestion(null)
    } else {
      const newQuestion = {
        ...questionData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setQuestions(prev => [newQuestion, ...prev])
    }
    setShowQuestionModal(false)
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion(question)
    setShowQuestionModal(true)
  }

  const handleDeleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleStatusChange = (id, newStatus) => {
    setQuestions(prev => prev.map(q =>
      q.id === id
        ? { ...q, status: newStatus, updatedAt: new Date().toISOString() }
        : q
    ))
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setFilters({ category: '', status: '', difficulty: '' })
  }

  const handleClearAllQuestions = () => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setQuestions([])
    }
  }

  // -------------------------------------------------------------
  // Stage 2: Kanban Handlers
  // -------------------------------------------------------------
  const handleOpenCreateTask = (defaultStatus = 'todo') => {
    setTaskModalState({
      isOpen: true,
      mode: 'create',
      task: null,
      defaultStatus
    })
  }

  const handleOpenEditTask = (task) => {
    setTaskModalState({
      isOpen: true,
      mode: 'edit',
      task,
      defaultStatus: task.status
    })
  }

  const handleCloseTaskModal = () => {
    setTaskModalState({
      isOpen: false,
      mode: 'create',
      task: null,
      defaultStatus: 'todo'
    })
  }

  const handleSubmitTask = (taskPayload) => {
    if (taskModalState.mode === 'create') {
      const newTask = {
        ...taskPayload,
        id: generateKanbanId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setKanbanTasks(prev => [newTask, ...prev])
    } else {
      setKanbanTasks(prev =>
        prev.map(t =>
          t.id === taskPayload.id
            ? { ...t, ...taskPayload, updatedAt: new Date().toISOString() }
            : t
        )
      )
    }
  }

  const handleOpenDeleteTask = (task) => {
    setDeleteModalState({
      isOpen: true,
      task
    })
  }

  const handleCloseDeleteModal = () => {
    setDeleteModalState({
      isOpen: false,
      task: null
    })
  }

  const handleConfirmDeleteTask = (taskId) => {
    setKanbanTasks(prev => prev.filter(t => t.id !== taskId))
    handleCloseDeleteModal()
  }

  const handleMoveKanbanTask = (taskId, targetStatus) => {
    setKanbanTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: targetStatus, updatedAt: new Date().toISOString() }
          : t
      )
    )
  }

  const handleResetKanbanFilters = () => {
    setKanbanSearch('')
    setKanbanPriority('all')
    setKanbanStatus('all')
  }

  // -------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------
  const handleNavigate = (view) => {
    setActiveView(view)
    if (view === 'tracker') {
      setTimeout(() => {
        document.getElementById('tracker-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else if (view === 'kanban') {
      setTimeout(() => {
        document.getElementById('kanban-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const hasActiveQuestionFilters = searchTerm || filters.category || filters.status || filters.difficulty
  const hasActiveKanbanFilters = kanbanSearch.trim() !== '' || kanbanPriority !== 'all' || kanbanStatus !== 'all'

  return (
    <div className="app">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        questionCount={questions.length}
      />

      <main className="app__main">
        {/* Hero Section */}
        <Hero
          onGetStarted={() => handleNavigate('kanban')}
          questionCount={questions.length}
        />

        {/* View Switcher Tabs Banner */}
        <div className="stage-switcher-banner">
          <div className="stage-switcher-container">
            <span className="stage-switcher-label">Select Workspace:</span>
            <div className="stage-switcher-pills">
              <button
                type="button"
                className={`stage-pill ${activeView === 'kanban' ? 'stage-pill--active' : ''}`}
                onClick={() => handleNavigate('kanban')}
              >
                <span>📌 Kanban Board</span>
                <span className="stage-badge-small">Stage 2</span>
              </button>
              <button
                type="button"
                className={`stage-pill ${activeView === 'tracker' ? 'stage-pill--active' : ''}`}
                onClick={() => handleNavigate('tracker')}
              >
                <span>📋 Question Tracker</span>
                <span className="stage-badge-gray">Stage 1</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            STAGE 2: KANBAN BOARD VIEW
            ========================================================= */}
        {(activeView === 'kanban' || activeView === 'home') && (
          <section id="kanban-section" className="kb-section">
            <KanbanStats
              tasks={kanbanTasks}
              selectedStatus={kanbanStatus}
              onSelectStatus={setKanbanStatus}
              onOpenArchitectureModal={() => setIsArchModalOpen(true)}
              onOpenAddModal={() => handleOpenCreateTask('todo')}
            />

            <KanbanFilterBar
              searchQuery={kanbanSearch}
              onSearchChange={setKanbanSearch}
              selectedPriority={kanbanPriority}
              onPriorityChange={setKanbanPriority}
              selectedStatus={kanbanStatus}
              onStatusChange={setKanbanStatus}
              onResetFilters={handleResetKanbanFilters}
              totalTasks={kanbanTasks.length}
              filteredCount={filteredKanbanTasks.length}
            />

            <KanbanBoard
              tasks={filteredKanbanTasks}
              allTasksCount={kanbanTasks.length}
              onAddTask={handleOpenCreateTask}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleOpenDeleteTask}
              onMoveTask={handleMoveKanbanTask}
              onDropTask={handleMoveKanbanTask}
              onResetFilters={handleResetKanbanFilters}
              hasActiveFilters={hasActiveKanbanFilters}
            />
          </section>
        )}

        {/* =========================================================
            STAGE 1: QUESTION TRACKER VIEW
            ========================================================= */}
        {(activeView === 'tracker' || activeView === 'home') && (
          <section id="tracker-section" className="app__tracker-section">
            <Dashboard questions={questions} />

            <QuestionTracker
              questions={filteredQuestions}
              allQuestions={questions}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onAddQuestion={() => { setEditingQuestion(null); setShowQuestionModal(true) }}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onStatusChange={handleStatusChange}
              onClearAll={handleClearAllQuestions}
              hasActiveFilters={hasActiveQuestionFilters}
            />
          </section>
        )}
      </main>

      <Footer />

      {/* Stage 1: Add Question Modal */}
      {showQuestionModal && (
        <AddQuestionModal
          isOpen={showQuestionModal}
          onClose={() => { setShowQuestionModal(false); setEditingQuestion(null) }}
          onSave={handleAddQuestion}
          editingQuestion={editingQuestion}
        />
      )}

      {/* Stage 2: Kanban Task Modal */}
      <TaskModal
        isOpen={taskModalState.isOpen}
        mode={taskModalState.mode}
        initialData={taskModalState.task}
        defaultStatus={taskModalState.defaultStatus}
        onClose={handleCloseTaskModal}
        onSubmit={handleSubmitTask}
      />

      {/* Stage 2: Kanban Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        task={deleteModalState.task}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteTask}
      />

      {/* Stage 2: Architecture & Viva Guide Modal */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </div>
  )
}

export default App
