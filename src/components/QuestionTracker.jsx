import React from 'react'
import Filters from './Filters'
import QuestionCard from './QuestionCard'
import EmptyState from './EmptyState'
import './QuestionTracker.css'

/**
 * QuestionTracker Component
 * Main section managing the filter bar, question card grid, and empty state fallbacks.
 */
function QuestionTracker({
  questions = [],
  allQuestions = [],
  searchTerm = '',
  onSearchChange,
  filters = { category: '', status: '', difficulty: '' },
  onFilterChange,
  onClearFilters,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion,
  onStatusChange,
  onClearAll,
  hasActiveFilters = false
}) {
  const isLibraryEmpty = !allQuestions || allQuestions.length === 0
  const isFilterEmpty = !isLibraryEmpty && (!questions || questions.length === 0)

  return (
    <section className="question-tracker" aria-labelledby="question-tracker-heading">
      {/* Header with Title and Action Buttons */}
      <div className="question-tracker__header">
        <div className="question-tracker__title-wrapper">
          <h2 id="question-tracker-heading" className="question-tracker__title">
            Question Tracker
          </h2>
          <div className="question-tracker__title-bar" aria-hidden="true" />
        </div>

        <div className="question-tracker__actions-group">
          {allQuestions && allQuestions.length > 0 && (
            <button
              type="button"
              className="question-tracker__secondary-btn"
              onClick={onClearAll}
              title="Clear all stored questions"
            >
              Clear All
            </button>
          )}

          <button
            type="button"
            className="question-tracker__add-btn"
            onClick={onAddQuestion}
          >
            <svg
              className="question-tracker__add-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Question
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <Filters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filters={filters}
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
        hasActiveFilters={hasActiveFilters}
        totalCount={allQuestions ? allQuestions.length : 0}
        filteredCount={questions ? questions.length : 0}
      />

      {/* Content: Empty States or Question Card Grid */}
      <div className="question-tracker__content">
        {isLibraryEmpty ? (
          <EmptyState
            type="no-questions"
            onAddQuestion={onAddQuestion}
          />
        ) : isFilterEmpty ? (
          <EmptyState type="no-results" onAddQuestion={onClearFilters} />
        ) : (
          <div className="question-tracker__grid">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                onEdit={onEditQuestion}
                onDelete={onDeleteQuestion}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default QuestionTracker
