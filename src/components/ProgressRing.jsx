import React from 'react';

/**
 * ProgressRing - Circular SVG progress indicator.
 *
 * @param {Object} props
 * @param {number} [props.percentage=0] - Percentage value between 0 and 100
 * @param {number} [props.size=120] - Diameter in pixels
 * @param {number} [props.strokeWidth=8] - Width of the ring stroke in pixels
 */
const ProgressRing = ({ percentage = 0, size = 120, strokeWidth = 8 }) => {
  // Ensure valid numerical bounds between 0 and 100
  const validPercentage = Math.min(100, Math.max(0, Math.round(percentage || 0)));

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (validPercentage / 100) * circumference;

  return (
    <div
      className="progress-ring"
      style={{ width: `${size}px`, height: `${size}px` }}
      role="progressbar"
      aria-valuenow={validPercentage}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={`Overall progress ${validPercentage} percent`}
    >
      <svg
        className="progress-ring__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background track circle */}
        <circle
          className="progress-ring__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Foreground progress arc */}
        <circle
          className="progress-ring__indicator"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />

        {/* Center percentage label */}
        <text
          className="progress-ring__text"
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
        >
          {validPercentage}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressRing;
