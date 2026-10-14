import React, { useMemo } from 'react';
import { CATEGORIES } from '../utils/constants';
import './Dashboard.css';

const Dashboard = ({ questions = [] }) => {
  const stats = useMemo(() => {
    const total = questions.length;
    const done = questions.filter((q) => q.status === 'Completed').length;
    const doing = questions.filter((q) => q.status === 'In Progress').length;
    const pending = total - done - doing;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const categories = CATEGORIES.map((name) => {
      const inCategory = questions.filter((q) => q.category === name);
      return {
        name,
        total: inCategory.length,
        done: inCategory.filter((q) => q.status === 'Completed').length,
      };
    });
    return { total, done, doing, pending, pct, categories };
  }, [questions]);

  const share = (n) => (stats.total > 0 ? (n / stats.total) * 100 : 0);

  return (
    <section className="dash" id="dashboard" aria-label="Progress overview">
      <div className="dash__panel">
        <div className="dash__main">
          <h2 className="dash__heading">
            {stats.total === 0
              ? 'Nothing tracked yet'
              : `${stats.pct}% of your list is interview-ready`}
          </h2>

          <p className="dash__figure">
            <span className="dash__big">{stats.done}</span>
            <span className="dash__of">of {stats.total} questions completed</span>
          </p>

          <div
            className="dash__bar"
            role="img"
            aria-label={`${stats.done} completed, ${stats.doing} in progress, ${stats.pending} pending`}
          >
            <span className="dash__seg dash__seg--done" style={{ width: `${share(stats.done)}%` }} />
            <span className="dash__seg dash__seg--doing" style={{ width: `${share(stats.doing)}%` }} />
          </div>

          <ul className="dash__legend">
            <li><i className="dash__dot dash__dot--done" />Completed <b>{stats.done}</b></li>
            <li><i className="dash__dot dash__dot--doing" />In progress <b>{stats.doing}</b></li>
            <li><i className="dash__dot dash__dot--todo" />Pending <b>{stats.pending}</b></li>
          </ul>

          {stats.total === 0 && (
            <p className="dash__empty">Add your first question and your progress shows up here.</p>
          )}
        </div>

        <div className="dash__cats">
          <h3 className="dash__sub">By category</h3>
          <ul className="dash__cat-list">
            {stats.categories.map((c) => (
              <li key={c.name} className={`dash__cat ${c.total === 0 ? 'dash__cat--empty' : ''}`}>
                <span className="dash__cat-name">{c.name}</span>
                <span className="dash__cat-track">
                  <span
                    className="dash__cat-fill"
                    style={{ width: `${c.total ? (c.done / c.total) * 100 : 0}%` }}
                  />
                </span>
                <span className="dash__cat-count">{c.done}/{c.total}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
