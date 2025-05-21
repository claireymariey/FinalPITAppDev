import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import MotionBarChart from "../components/MotionBarChart";
import MotionTimelineChart from "../components/Timeline";

export default function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
   const [data, setData] = useState([]);
   const [chartType, setChartType] = useState("bar-graph"); 

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };
  
  useEffect(() => {
     let isMounted = true;
     
     const fetchData = async () => {
        const response = await axios.get(
           "https://finalpitappdev.onrender.com/api/motion/get/",
           { 
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
              },
           }
        );
        if (response.status === 200 && isMounted) {
            setData(response.data);
         }
     }
     fetchData();
     
     const interval = setInterval(fetchData, 10000);
     
     return () => {
        isMounted = false;
        clearInterval(interval);
     }
  }, [])
  
   useEffect(() => {
      console.log('updated');
   }, [data]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="chart-btn-container">
         <button 
            onClick={() => chartType === "bar-graph" ? {} : setChartType("bar-graph")} 
            className="chart_btn"
         >
               Bar Chart
         </button>
         <button
            onClick={() => chartType === "timeline" ? {} : setChartType("timeline")} 
            className="chart_btn"
         >
            Timeline
         </button>
         <button
            onClick={() => chartType === "table" ? {} : setChartType("table")} 
            className="chart_btn"
         >
            Table
         </button>
      </div>
      <div className="dashboard-card">
         {
            chartType === "bar-graph" 
               ? <MotionBarChart events={data}/> 
                  : chartType === "timeline" ? <MotionTimelineChart motionTimestamps={data.filter((e) => e.status === "motion").map((e) => new Date(e.timestamp))} /> : (
                     <table className="dashboard-table">
                       <thead>
                         <tr>
                           <th>Timestamp</th>
                           <th>Status</th>
                         </tr>
                       </thead>
                       <tbody>
                         {data.map((item, i) => (
                           <tr key={i}>
                             <td>{new Date(item.timestamp).toLocaleString()}</td>
                             <td>{item.status}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                  )}
      </div>
    </div>
  );
}
