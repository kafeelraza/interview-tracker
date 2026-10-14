import React, { useEffect, useRef } from 'react';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants';
import './Filters.css';

function Filters({
  searchTerm = '',
  onSearchChange,
  filters = { category: '', status: '', difficulty: '' },
  onFilterChange,
  onClearFilters,
  hasActiveFilters = false,
  totalCount = 0,
  filteredCount = 0,
}) {
  const searchRef = useRef(null);

  // press "/" anywhere to jump to search
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const statusTabs = ['', ...STATUSES];

  return (
    <div className="filters">
      <div className="filters__top">
        <div className="filters__search">
          <svg className="filters__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            className="filters__input"
            placeholder="Search by title or notes"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search questions"
          />
          {!searchTerm && <kbd className="filters__kbd" aria-hidden="true">/</kbd>}
        </div>
        <p className="filters__count" aria-live="polite">
          <b>{filteredCount}</b> of {totalCount} questions
        </p>
      </div>

      <div className="filters__bottom">
        <div className="filters__tabs" role="group" aria-label="Filter by status">
          {statusTabs.map((s) => {
            const active = (filters.status || '') === s;
            return (
              <button
                key={s || 'all'}
                type="button"
                className={`filters__tab ${active ? 'is-active' : ''}`}
                onClick={() => onFilterChange('status', s)}
                aria-pressed={active}
              >
                {s || 'All'}
              </button>
            );
          })}
        </div>

        <div className="filters__selects">
          <select
            className={`filters__select ${filters.category ? 'is-active' : ''}`}
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            className={`filters__select ${filters.difficulty ? 'is-active' : ''}`}
            value={filters.difficulty || ''}
            onChange={(e) => onFilterChange('difficulty', e.target.value)}
            aria-label="Filter by difficulty"
          >
            <option value="">All difficulties</option>
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {hasActiveFilters && (
            <button type="button" className="filters__clear" onClick={onClearFilters}>
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
