import { useState, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generateId } from './utils/constants'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import QuestionTracker from './components/QuestionTracker'
import AddQuestionModal from './components/AddQuestionModal'
import Footer from './components/Footer'
import './App.css'

/**
 * Main application component for PrepTrack
 * Manages global application state including questions, filters, modal visibility, and navigation.
 */
function App() {
  const [questions, setQuestions] = useLocalStorage('preptrack_questions_list', [])
  const [activeView, setActiveView] = useState('home')
  const [showModal, setShowModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    difficulty: ''
  })

  // Filtered questions based on search and filters
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
    setShowModal(false)
  }

  const handleEditQuestion = (question) => {
    setEditingQuestion(question)
    setShowModal(true)
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

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all questions?')) {
      setQuestions([])
    }
  }

  const openAddModal = () => {
    setEditingQuestion(null)
    setShowModal(true)
  }

  const handleNavigate = (view) => {
    setActiveView(view)
    if (view === 'tracker') {
      setTimeout(() => {
        document.getElementById('tracker-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const hasActiveFilters = searchTerm || filters.category || filters.status || filters.difficulty

  return (
    <div className="app">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        questionCount={questions.length}
      />

      <main className="app__main">
        <Hero
          onGetStarted={() => handleNavigate('tracker')}
          questionCount={questions.length}
        />

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
            onAddQuestion={openAddModal}
            onEditQuestion={handleEditQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onStatusChange={handleStatusChange}
            onClearAll={handleClearAll}
            hasActiveFilters={hasActiveFilters}
          />
        </section>
      </main>

      <Footer />

      {showModal && (
        <AddQuestionModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setEditingQuestion(null) }}
          onSave={handleAddQuestion}
          editingQuestion={editingQuestion}
        />
      )}
    </div>
  )
}

export default App
