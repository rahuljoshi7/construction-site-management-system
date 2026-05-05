import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [labours, setLabours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Fetching data...");

      const labourRes = await API.get("/labour");
      const attendanceRes = await API.get("/attendance");

      console.log("Labour:", labourRes.data);
      console.log("Attendance:", attendanceRes.data);

      // ✅ Handles BOTH formats
      const labourData = labourRes.data?.data || labourRes.data || [];
      const attendanceData = attendanceRes.data?.data || attendanceRes.data || [];

      setLabours(Array.isArray(labourData) ? labourData : []);
      setAttendance(Array.isArray(attendanceData) ? attendanceData : []);

    } catch (err) {
      console.error("API ERROR:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // 🔢 Calculations
  const present = attendance.filter(a => a.status === "present").length;
  const absent = attendance.filter(a => a.status === "absent").length;
  const half = attendance.filter(a => a.status === "half").length;

  const totalPayroll = labours.reduce((sum, l) => sum + (l.wage || 0), 0);
  const avgWage = labours.length ? Math.round(totalPayroll / labours.length) : 0;

  // 📊 Pie Data
  const pieData = {
    labels: ["Present", "Absent", "Half"],
    datasets: [{
      data: [present, absent, half],
      backgroundColor: ["#00e87a", "#ff4757", "#ffb347"]
    }]
  };

  // 📊 Bar Data
  const barData = {
    labels: labours.slice(0, 5).map(l => l.name || "N/A"),
    datasets: [{
      label: "Wage",
      data: labours.slice(0, 5).map(l => l.wage || 0),
      backgroundColor: "#f97316"
    }]
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Loading Dashboard...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div style={{ color: "red", padding: "40px" }}>
        {error}
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">Dashboard</h1>

      {/* DEBUG INFO */}
      <div style={{ color: "#888", marginBottom: "10px" }}>
        Workers: {labours.length} | Attendance: {attendance.length}
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Workers</h3>
          <p>{labours.length}</p>
        </div>

        <div className="stat-card">
          <h3>Present</h3>
          <p>{present}</p>
        </div>

        <div className="stat-card">
          <h3>Absent</h3>
          <p>{absent}</p>
        </div>

        <div className="stat-card">
          <h3>Half Day</h3>
          <p>{half}</p>
        </div>

        <div className="stat-card">
          <h3>Total Payroll</h3>
          <p>₹{totalPayroll}</p>
        </div>

        <div className="stat-card">
          <h3>Avg Wage</h3>
          <p>₹{avgWage}</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="charts-section">

        <div className="chart-card">
          <h3>Attendance</h3>
          {attendance.length ? (
            <Pie data={pieData} />
          ) : (
            <p style={{ color: "#888" }}>No data</p>
          )}
        </div>

        <div className="chart-card">
          <h3>Wages</h3>
          {labours.length ? (
            <Bar data={barData} />
          ) : (
            <p style={{ color: "#888" }}>No data</p>
          )}
        </div>

      </div>

      {/* ACTIONS */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="action-buttons">
          <Link to="/labour" className="action-btn">Add Worker</Link>
          <Link to="/attendance" className="action-btn">Attendance</Link>
          <Link to="/payroll" className="action-btn">Payroll</Link>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;