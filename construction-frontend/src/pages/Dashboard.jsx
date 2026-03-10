import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";

function Dashboard() {

  const [totalWorkers, setTotalWorkers] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const labourRes = await API.get("/labour");
      const attendanceRes = await API.get("/attendance");

      const labours = labourRes.data.data || [];
      const attendance = attendanceRes.data.data || [];

      setTotalWorkers(labours.length);

      const today = new Date().toDateString();

      let presentCount = 0;
      let overtime = 0;

      attendance.forEach((record) => {

        const recordDate = new Date(record.date).toDateString();

        if (recordDate === today && record.status === "present") {
          presentCount++;
        }

        if (recordDate === today) {
          overtime += record.overtimeHours || 0;
        }

      });

      setPresentToday(presentCount);
      setOvertimeHours(overtime);

    } catch (error) {

      console.error("Dashboard fetch failed", error);

    }

  };

  return (

    <div className="dashboard-page">

      <h1 className="dashboard-title">
        Construction Site Dashboard
      </h1>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Workers</h3>
          <p>{totalWorkers}</p>
        </div>

        <div className="stat-card">
          <h3>Present Today</h3>
          <p>{presentToday}</p>
        </div>

        <div className="stat-card">
          <h3>Total Overtime</h3>
          <p>{overtimeHours} hrs</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-buttons">

          <Link to="/labour" className="action-btn">
            Manage Workers
          </Link>

          <Link to="/attendance" className="action-btn">
            Mark Attendance
          </Link>

          <Link to="/payroll" className="action-btn">
            View Payroll
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;