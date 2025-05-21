import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function MotionTimelineChart({ motionTimestamps }) {
  // Convert timestamps to data points
  const chartData = motionTimestamps.map((timestamp, index) => ({
    time: timestamp,
    value: 1, // static value to show as a mark
  }));

  return (
    <LineChart width={800} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        type="number"
        domain={['auto', 'auto']}
        scale="time"
        tickFormatter={(time) => new Date(time).toLocaleTimeString()}
      />
      <YAxis hide domain={[0, 2]} />
      <Tooltip labelFormatter={(time) => new Date(time).toLocaleString()} />
      <Line
        dataKey="value"
        dot={{ r: 3 }}
        stroke="red"
        strokeWidth={0}
        activeDot={{ r: 6 }}
        isAnimationActive={false}
      />
    </LineChart>
  );
}
