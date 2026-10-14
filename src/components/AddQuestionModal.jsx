import { useState, useEffect } from 'react';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants';
import './AddQuestionModal.css';

const slug = (s = '') => s.toLowerCase().replace(/\s+/g, '-');

function ChoiceGroup({ label, name, options, value, onChange, error, required }) {
  return (
    <fieldset className="modal__field">
      <legend className="modal__label">
        {label}{required && <span className="modal__req" aria-hidden="true"> *</span>}
      </legend>
      <div className="modal__choices" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={value === opt}
            data-tone={slug(opt)}
            className={`modal__choice ${value === opt ? 'is-selected' : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <span className="modal__error" role="alert">{error}</span>}
    </fieldset>
  );
}

function AddQuestionModal({ isOpen = false, onClose, onSave, editingQuestion = null }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [status, setStatus] = useState('Pending');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(editingQuestion?.title || '');
    setCategory(editingQuestion?.category || '');
    setDifficulty(editingQuestion?.difficulty || '');
    setStatus(editingQuestion?.status || 'Pending');
    setNotes(editingQuestion?.notes || '');
    setErrors({});
  }, [editingQuestion, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const next = {};
    if (trimmedTitle.length < 3) next.title = 'Enter a title with at least 3 characters.';
    if (!category) next.category = 'Pick a category.';
    if (!difficulty) next.difficulty = 'Pick a difficulty.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    onSave({
      title: trimmedTitle,
      category,
      difficulty,
      status: status || 'Pending',
      notes: notes.trim(),
    });
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit(e);
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__header">
          <h2 className="modal__title" id="modal-title">
            {editingQuestion ? 'Edit question' : 'Add a question'}
          </h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate>
          <div className="modal__body">
            <div className="modal__field">
              <label className="modal__label" htmlFor="q-title">
                Question<span className="modal__req" aria-hidden="true"> *</span>
              </label>
              <input
                id="q-title"
                type="text"
                className={`modal__input ${errors.title ? 'has-error' : ''}`}
                placeholder="Reverse a linked list"
                value={title}
                onChange={(e) => { setTitle(e.target.value); clearError('title'); }}
                autoFocus
              />
              {errors.title && <span className="modal__error" role="alert">{errors.title}</span>}
            </div>

            <ChoiceGroup
              label="Category" name="category" required
              options={CATEGORIES} value={category} error={errors.category}
              onChange={(v) => { setCategory(v); clearError('category'); }}
            />
            <ChoiceGroup
              label="Difficulty" name="difficulty" required
              options={DIFFICULTIES} value={difficulty} error={errors.difficulty}
              onChange={(v) => { setDifficulty(v); clearError('difficulty'); }}
            />
            <ChoiceGroup
              label="Status" name="status"
              options={STATUSES} value={status}
              onChange={setStatus}
            />

            <div className="modal__field">
              <label className="modal__label" htmlFor="q-notes">Approach and notes</label>
              <textarea
                id="q-notes"
                className="modal__input modal__textarea"
                placeholder="Key idea, time and space complexity, edge cases"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <div className="modal__footer">
            <span className="modal__hint">Ctrl + Enter to save</span>
            <div className="modal__buttons">
              <button type="button" className="modal__btn modal__btn--ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="modal__btn modal__btn--primary">
                {editingQuestion ? 'Save changes' : 'Add question'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionModal;
