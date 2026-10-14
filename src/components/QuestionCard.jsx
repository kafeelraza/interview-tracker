import React from 'react';
import { STATUSES } from '../utils/constants';
import './QuestionCard.css';

const slug = (s = '') => s.toLowerCase().replace(/\s+/g, '-');

function QuestionCard({ question, onEdit, onDelete, onStatusChange }) {
  if (!question) return null;

  const status = question.status || 'Pending';
  const formattedDate = question.createdAt
    ? new Date(question.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';
  const hasNotes = question.notes && question.notes.trim();

  return (
    <article
      className="card"
      data-status={slug(status)}
      data-difficulty={slug(question.difficulty)}
    >
      <div className="card__text">
        <div className="card__top">
          <div className="card__tags">
            <span className="card__category">{question.category}</span>
            <span className="card__difficulty">{question.difficulty}</span>
          </div>

          <div className="card__actions">
            <button
              type="button"
              className="card__action-btn"
              onClick={() => onEdit(question)}
              aria-label={`Edit ${question.title}`}
              title="Edit question"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
            <button
              type="button"
              className="card__action-btn card__action-btn--delete"
              onClick={() => onDelete(question.id)}
              aria-label={`Delete ${question.title}`}
              title="Delete question"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>

        <h3 className="card__title" title={question.title}>
          {question.title}
        </h3>

        {hasNotes && (
          <p className="card__subtitle" title={question.notes}>
            {question.notes}
          </p>
        )}

        {formattedDate && <span className="card__date">Added {formattedDate}</span>}
      </div>

      {/* Bottom status buttons strip */}
      <div className="card__icons" role="group" aria-label="Quick change status">
        {STATUSES.map((option) => {
          const active = status === option;
          return (
            <button
              key={option}
              type="button"
              className={`card__btn card__btn--${slug(option)} ${active ? 'is-active' : ''}`}
              onClick={() => onStatusChange(question.id, option)}
              aria-pressed={active}
            >
              {option}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export default QuestionCard;
