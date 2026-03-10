import { useState, useEffect } from "react";
import API from "../services/api";
import "./AttendancePage.css";

function AttendancePage() {

  const [labours, setLabours] = useState([]);

  const [labourId, setLabourId] = useState("");
  const [status, setStatus] = useState("present");
  const [shift, setShift] = useState("morning");
  const [overtimeHours, setOvertimeHours] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);

  // Fetch labour list
  useEffect(() => {

    const fetchLabours = async () => {

      try {

        const res = await API.get("/labour");

        setLabours(res.data.data || []);

      } catch (error) {

        console.error("Failed to fetch labours:", error);

      }

    };

    fetchLabours();

  }, []);

  const markAttendance = async () => {

    if (!labourId) {
      alert("Please select a labour");
      return;
    }

    setIsSubmitting(true);

    try {

      await API.post("/attendance", {
        labour: labourId,
        status: status,
        shift: shift,
        overtimeHours: Number(overtimeHours)
      });

      const selectedLabour = labours.find(l => l._id === labourId);

      const newEntry = {
        id: Date.now(),
        name: selectedLabour?.name || "Worker",
        status: status,
        shift: shift,
        overtimeHours: overtimeHours,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      };

      setRecentEntries([newEntry, ...recentEntries.slice(0, 4)]);

      // Reset form
      setLabourId("");
      setStatus("present");
      setShift("morning");
      setOvertimeHours(0);

      alert("Attendance marked successfully");

    } catch (error) {

      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to mark attendance");
      }

    } finally {

      setIsSubmitting(false);

    }

  };

  const statusOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "half-day", label: "Half Day" }
  ];

  return (

    <div className="attendance-page">

      <h1 className="page-title">Mark Attendance</h1>

      <div className="attendance-container">

        {/* Attendance Form */}

        <div className="attendance-form-card">

          <h2>Quick Entry</h2>

          {/* Labour Selection */}

          <div className="form-group">

            <label>Labour</label>

            <select
              className="form-input"
              value={labourId}
              onChange={(e) => setLabourId(e.target.value)}
              disabled={isSubmitting}
            >

              <option value="">Select Labour</option>

              {labours.map((labour) => (

                <option key={labour._id} value={labour._id}>
                  {labour.name}
                </option>

              ))}

            </select>

          </div>

          {/* Status */}

          <div className="form-group">

            <label>Status</label>

            <div className="status-options">

              {statusOptions.map((option) => (

                <label key={option.value} className="status-option">

                  <input
                    type="radio"
                    value={option.value}
                    checked={status === option.value}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={isSubmitting}
                  />

                  {option.label}

                </label>

              ))}

            </div>

          </div>

          {/* Shift Selection */}

          <div className="form-group">

            <label>Shift</label>

            <select
              className="form-input"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >

              <option value="morning">Morning (8AM - 5PM)</option>
              <option value="evening">Evening (5PM - 12AM)</option>
              <option value="night">Night (12AM - 8AM)</option>

            </select>

          </div>

          {/* Overtime */}

          <div className="form-group">

            <label>Overtime Hours</label>

            <input
              type="number"
              className="form-input"
              value={overtimeHours}
              min="0"
              placeholder="Enter overtime hours"
              onChange={(e) => setOvertimeHours(e.target.value)}
            />

          </div>

          {/* Submit */}

          <button
            className="submit-btn"
            onClick={markAttendance}
            disabled={isSubmitting}
          >

            {isSubmitting ? "Submitting..." : "Mark Attendance"}

          </button>

        </div>

        {/* Recent Entries */}

        <div className="recent-entries-card">

          <h3>Recent Entries</h3>

          {recentEntries.length === 0 && (
            <p>No entries yet</p>
          )}

          <div className="entries-list">

            {recentEntries.map((entry) => (

              <div key={entry.id} className="entry-item">

                <div>

                  <strong>{entry.name}</strong>

                  <div>Shift: {entry.shift}</div>

                  {entry.overtimeHours > 0 && (
                    <div>Overtime: {entry.overtimeHours} hrs</div>
                  )}

                </div>

                <div>

                  <span className={`entry-status ${entry.status}`}>
                    {entry.status}
                  </span>

                  <div className="entry-time">
                    {entry.time}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AttendancePage;