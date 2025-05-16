import './Dashboard.css';

export default function Dashboard() {
  const data = [
    { timestamp: new Date().toISOString(), value: 45 },
    { timestamp: new Date(Date.now() - 1000000).toISOString(), value: 37 },
    { timestamp: new Date(Date.now() - 5000000).toISOString(), value: 28 },
  ];

  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard</h1>
      <div className="dashboard-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
