import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title
} from 'chart.js';
import { format, addMinutes, startOfMinute } from 'date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

function groupEventsBy5Minutes(events) {
  const grouped = {};

  for (const event of events) {
    if (event.status === "motion") {
      const ts = new Date(event.timestamp);
      const interval = new Date(
        ts.getFullYear(),
        ts.getMonth(),
        ts.getDate(),
        ts.getHours(),
        Math.floor(ts.getMinutes() / 5) * 5,
        0, 0
      );

      const key = interval.toISOString();
      grouped[key] = (grouped[key] || 0) + 1;
    }
  }

  const sorted = Object.entries(grouped)
    .map(([key, count]) => ({
      time: new Date(key),
      count,
    }))
    .sort((a, b) => a.time - b.time);

  return sorted;
}

const MotionBarChart = ({ events }) => {
  const groupedData = groupEventsBy5Minutes(events);
   console.log(groupedData);

  const labels = groupedData.map(({ time }) => {
    const end = addMinutes(time, 5);
    return `${format(time, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  });

  const counts = groupedData.map(d => d.count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Motion Events',
        data: counts,
        backgroundColor: 'rgba(33, 150, 243, 0.7)',
        borderRadius: 5,
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: context => `Count: ${context.raw}`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90,
          autoSkip: false,
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <h4 style={{marginBottom: 25, marginTop: 10, marginLeft: 15}}>Motion Detected per 5 minutes</h4>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MotionBarChart;
