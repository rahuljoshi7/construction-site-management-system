import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import './Dashboard.css';

import {
  Pie,
  Bar
} from "react-chartjs-2";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const labourRes = await API.get("/labour");
      const attendanceRes = await API.get("/attendance");

      setLabours(labourRes.data.data || []);
      setAttendance(attendanceRes.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔢 Attendance counts
  const present = attendance.filter(a => a.status === "present").length;
  const absent = attendance.filter(a => a.status === "absent").length;
  const half = attendance.filter(a => a.status === "half").length;
  const totalAttendance = attendance.length;

  // 💰 Calculate total payroll
  const totalPayroll = labours.reduce((sum, labour) => sum + (labour.wage || 0), 0);
  const avgWage = labours.length > 0 ? (totalPayroll / labours.length).toFixed(0) : 0;

  // 📊 Pie Chart Data
  const pieData = {
    labels: ["Present", "Absent", "Half Day"],
    datasets: [
      {
        data: [present, absent, half],
        backgroundColor: [
          'rgba(0, 232, 122, 0.8)',
          'rgba(255, 71, 87, 0.8)',
          'rgba(255, 179, 71, 0.8)'
        ],
        borderColor: [
          '#00e87a',
          '#ff4757',
          '#ffb347'
        ],
        borderWidth: 2
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#f5f5f5',
          font: {
            family: 'JetBrains Mono',
            size: 11,
            weight: '700'
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f5f5f5',
        bodyColor: '#f5f5f5',
        borderColor: '#242424',
        borderWidth: 1,
        titleFont: {
          family: 'JetBrains Mono',
          weight: '700'
        },
        bodyFont: {
          family: 'JetBrains Mono'
        },
        padding: 12,
        displayColors: true
      }
    }
  };

  // 💰 Bar Chart Data
  const barData = {
    labels: labours.slice(0, 10).map(l => l.name),
    datasets: [
      {
        label: "Daily Wage",
        data: labours.slice(0, 10).map(l => l.wage),
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: '#f97316',
        borderWidth: 2,
        borderRadius: 4
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#f5f5f5',
          font: {
            family: 'JetBrains Mono',
            size: 11,
            weight: '700'
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f5f5f5',
        bodyColor: '#f5f5f5',
        borderColor: '#242424',
        borderWidth: 1,
        titleFont: {
          family: 'JetBrains Mono',
          weight: '700'
        },
        bodyFont: {
          family: 'JetBrains Mono'
        },
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return ' ₹' + context.parsed.y.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#242424',
          drawBorder: false
        },
        ticks: {
          color: '#888',
          font: {
            family: 'JetBrains Mono',
            size: 10
          }
        }
      },
      y: {
        grid: {
          color: '#242424',
          drawBorder: false
        },
        ticks: {
          color: '#888',
          font: {
            family: 'JetBrains Mono',
            size: 10
          },
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <h1 className="dashboard-title">Dashboard</h1>
        <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">Dashboard</h1>

      {/* STATS GRID */}
      <div className="stats-grid">
        
        <div className="stat-card">
          <h3>Total Workers</h3>
          <p>{labours.length}</p>
        </div>

        <div className="stat-card">
          <h3>Present Today</h3>
          <p>{present}</p>
        </div>

        <div className="stat-card">
          <h3>Absent Today</h3>
          <p>{absent}</p>
        </div>

        <div className="stat-card">
          <h3>Half Day</h3>
          <p>{half}</p>
        </div>

        <div className="stat-card">
          <h3>Total Payroll</h3>
          <p>₹{totalPayroll.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Avg Wage</h3>
          <p>₹{avgWage}</p>
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="charts-section">
        
        <div className="chart-card">
          <div className="chart-header">
            <h3>Attendance Overview</h3>
            <span className="chart-subtitle">Today's Status</span>
          </div>
          <div className="chart-container pie-chart">
            {totalAttendance > 0 ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <div className="no-data">No attendance data</div>
            )}
          </div>
        </div>

        <div className="chart-card chart-card-wide">
          <div className="chart-header">
            <h3>Worker Wages</h3>
            <span className="chart-subtitle">Daily Wage Distribution (Top 10)</span>
          </div>
          <div className="chart-container bar-chart">
            {labours.length > 0 ? (
              <Bar data={barData} options={barOptions} />
            ) : (
              <div className="no-data">No labour data</div>
            )}
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          
          <Link to="/labour" className="action-btn">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
            Add New Worker
          </Link>

          <Link to="/attendance" className="action-btn">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
            Mark Attendance
          </Link>

          <Link to="/payroll" className="action-btn">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-10V4m0 16v-2m9-6a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Process Payroll
          </Link>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;