import React from 'react';
import './EmptyState.css';

/**
 * EmptyState component displays placeholder screens when no questions exist
 * or when a search/filter returns zero results.
 *
 * @param {Object} props
 * @param {'no-questions' | 'no-results'} [props.type='no-questions'] - Empty state type
 * @param {() => void} [props.onAddQuestion] - Callback for adding a question
 */
const EmptyState = ({
  type = 'no-questions',
  onAddQuestion,
  onSecondaryAction,
  secondaryLabel
}) => {
  const isNoResults = type === 'no-results';

  return (
    <div className="empty-state" role="status">
      {/* CSS-drawn stylized illustrations */}
      <div className="empty-state__illustration" aria-hidden="true">
        {isNoResults ? (
          <div className="empty-state__magnifier">
            <div className="empty-state__magnifier-glass">
              <div className="empty-state__magnifier-glare" />
            </div>
            <div className="empty-state__magnifier-handle" />
          </div>
        ) : (
          <div className="empty-state__clipboard">
            <div className="empty-state__clipboard-clip" />
            <div className="empty-state__clipboard-body">
              <div className="empty-state__clipboard-line empty-state__clipboard-line--1" />
              <div className="empty-state__clipboard-line empty-state__clipboard-line--2" />
              <div className="empty-state__clipboard-line empty-state__clipboard-line--3" />
              <div className="empty-state__clipboard-line empty-state__clipboard-line--4" />
            </div>
          </div>
        )}
      </div>

      <h3 className="empty-state__title">
        {isNoResults ? 'No matching questions' : 'No questions yet'}
      </h3>

      <p className="empty-state__subtext">
        {isNoResults
          ? "Try adjusting your filters or search term to find what you're looking for."
          : 'Start building your interview prep tracker by adding your first question.'}
      </p>

      {!isNoResults && (
        <div className="empty-state__actions">
          {onAddQuestion && (
            <button
              type="button"
              className="empty-state__btn"
              onClick={onAddQuestion}
            >
              + Add Your First Question
            </button>
          )}
          {onSecondaryAction && (
            <button
              type="button"
              className="empty-state__btn empty-state__btn--secondary"
              onClick={onSecondaryAction}
            >
              {secondaryLabel || 'Load Sample Data'}
            </button>
          )}
        </div>
      )}

      {isNoResults && onAddQuestion && (
        <button
          type="button"
          className="empty-state__btn empty-state__btn--secondary"
          onClick={onAddQuestion}
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
