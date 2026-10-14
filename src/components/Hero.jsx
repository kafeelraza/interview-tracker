import React from 'react';
import './Hero.css';

const Hero = ({ onGetStarted, questionCount = 0 }) => {
  const handleStart = () => {
    if (onGetStarted) {
      onGetStarted();
      return;
    }
    const target = document.getElementById('tracker-section') || document.getElementById('dashboard');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hero" aria-label="Hero Introduction">
      <div className="hero__inner">
        <div className="hero__card">
          <div className="hero__badge">
            <span>⚡</span> Interview Practice Tracker
          </div>

          <h1 className="hero__title">
            Know which interview questions you can answer <em>cold.</em>
          </h1>

          <p className="hero__subtitle">
            Log every DSA problem, system design concept, and machine-coding challenge in one place.
            Spot readiness gaps early and walk into your next interview with complete confidence.
          </p>

          <div className="hero__actions">
            <button type="button" className="hero__btn" onClick={handleStart}>
              Start Tracking Now
            </button>

            <div className="hero__note-pill">
              <span className="hero__note-dot" aria-hidden="true" />
              <span>
                {questionCount > 0
                  ? `${questionCount} questions tracked • 100% in-browser`
                  : 'Saved locally in your browser • Zero signup needed'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
