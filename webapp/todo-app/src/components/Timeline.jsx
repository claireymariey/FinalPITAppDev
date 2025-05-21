import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const MotionTimeline = ({ events, theme = 'light' }) => {
  // Filter motion events and sort by timestamp
  const motionEvents = useMemo(() => 
    events
      .filter(event => event.status === 'motion')
      .sort((a, b) => a.timestamp - b.timestamp),
    [events]
  );

  // Theme configuration
  const themes = {
    light: {
      background: 'bg-white',
      line: 'stroke-gray-300',
      dot: 'fill-red-700',
      text: 'text-gray-800',
      grid: 'stroke-gray-200',
    },
    dark: {
      background: 'bg-gray-800',
      line: 'stroke-gray-500',
      dot: 'fill-red-500',
      text: 'text-gray-200',
      grid: 'stroke-gray-600',
    },
  };

  const currentTheme = themes[theme] || themes.light;

  if (motionEvents.length === 0) {
    return (
      <div className={`w-full p-4 ${currentTheme.background}`}>
        <p className={`text-center ${currentTheme.text}`}>No motion events to display</p>
      </div>
    );
  }

  // Calculate time range
  const startTime = motionEvents[0].timestamp;
  const endTime = motionEvents[motionEvents.length - 1].timestamp;
  const timeRangeSeconds = (endTime - startTime) / 1000;

  // Format timestamp for labels
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Format tooltip time
  const formatTooltipTime = (date) => {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  };

  // Generate x-axis labels (every 15 minutes)
  const labelInterval = 1 * 60; // 15 minutes in seconds
  const labels = [];
  const startSeconds = 0;
  const endSeconds = timeRangeSeconds;
  for (let seconds = 0; seconds <= endSeconds; seconds += labelInterval) {
    const time = new Date(startTime.getTime() + seconds * 1000);
    labels.push({ seconds, time });
  }

  // SVG dimensions
  const width = 1500; // Fixed width for simplicity
  const height = 400;
  const margin = { top: 20, bottom: 40, left: 20, right: 20 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  return (
    <div className={`w-full p-4 ${currentTheme.background}`}>
      <svg width={width} height={height} className="relative">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {labels.map(({ seconds }, index) => (
            <line
              key={index}
              x1={(seconds / timeRangeSeconds) * plotWidth}
              y1={0}
              x2={(seconds / timeRangeSeconds) * plotWidth}
              y2={plotHeight}
              className={currentTheme.grid}
              strokeWidth="1"
            />
          ))}

          {/* Timeline base line */}
          <line
            x1={0}
            y1={plotHeight / 2}
            x2={plotWidth}
            y2={plotHeight / 2}
            className={currentTheme.line}
            strokeWidth="1"
          />

          {/* Motion event dots */}
          {motionEvents.map((event, index) => {
            const x = ((event.timestamp - startTime) / 1000 / timeRangeSeconds) * plotWidth;
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={plotHeight / 2}
                  r={4}
                  className={currentTheme.dot}
                />
                <title>{formatTooltipTime(event.timestamp)}</title>
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map(({ seconds, time }, index) => (
            <text
              key={index}
              x={(seconds / timeRangeSeconds) * plotWidth}
              y={plotHeight + 25}
              className={`${currentTheme.text} text-xs`}
              textAnchor="middle"
            >
              {formatTime(time)}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

MotionTimeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.oneOf(['motion', 'no_motion']).isRequired,
    })
  ).isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
};

export default MotionTimeline;
