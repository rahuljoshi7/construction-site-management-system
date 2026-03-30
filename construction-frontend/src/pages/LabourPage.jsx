import { useState, useEffect } from "react";
import API from "../services/api";
import "./LabourPage.css";

function LabourPage() {

  // 🔐 Get user safely
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  const user = getUser();
  const isAdmin = user?.role === "admin";

  const [name, setName] = useState("");
  const [wage, setWage] = useState("");
  const [role, setRole] = useState("general");

  const [labourList, setLabourList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  // Attendance states
  const [attendanceData, setAttendanceData] = useState([]);
  const [showAttendance, setShowAttendance] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");

  const roles = [
    { value: "general", label: "General Labour", icon: "👷" },
    { value: "mason", label: "Mason", icon: "🧱" },
    { value: "carpenter", label: "Carpenter", icon: "🔨" },
    { value: "electrician", label: "Electrician", icon: "⚡" },
    { value: "plumber", label: "Plumber", icon: "🔧" },
    { value: "painter", label: "Painter", icon: "🎨" }
  ];

  // FETCH WORKERS
  const fetchLabours = async () => {
    try {
      const res = await API.get("/labour");
      setLabourList(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch workers:", error);
    }
  };

  useEffect(() => {
    fetchLabours();
  }, []);

  // ADD OR UPDATE WORKER
  const addLabour = async () => {

    if (!isAdmin) {
      alert("Only admin can perform this action");
      return;
    }

    if (!name.trim() || !wage) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editId) {
        await API.put(`/labour/${editId}`, {
          name,
          wage: Number(wage),
          role
        });
        alert("Worker updated successfully");
      } else {
        await API.post("/labour", {
          name,
          wage: Number(wage),
          role
        });
        alert("Worker added successfully");
      }

      resetForm();
      fetchLabours();

    } catch (error) {
      console.error(error);
      alert("Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setName("");
    setWage("");
    setRole("general");
    setEditId(null);
  };

  // DELETE WORKER
  const deleteLabour = async (id) => {

    if (!isAdmin) {
      alert("Only admin can delete workers");
      return;
    }

    const confirmDelete = window.confirm("Delete this worker?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/labour/${id}`);
      fetchLabours();
    } catch (error) {
      console.error(error);
      alert("Failed to delete worker");
    }
  };

  // EDIT WORKER
  const editLabour = (labour) => {

    if (!isAdmin) return;

    setName(labour.name || "");
    setWage(labour.wage || "");
    setRole(labour.role || "general");
    setEditId(labour._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // VIEW ATTENDANCE
  const viewAttendance = async (labourId, name) => {
    try {
      const res = await API.get(`/attendance/worker/${labourId}`);
      setAttendanceData(res.data.data || []);
      setSelectedWorker(name);
      setShowAttendance(true);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch attendance");
    }
  };

  return (

    <div className="labour-page">

      <h1 className="page-title">Labour Management</h1>

      {/* FORM (Admin only) */}
      {isAdmin && (
        <div className="form-card">

          <h2>{editId ? "Edit Worker" : "Add Worker"}</h2>

          <input
            className="form-input"
            placeholder="Worker name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-input"
            type="number"
            placeholder="Daily wage"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
          />

          <select
            className="form-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.icon} {r.label}
              </option>
            ))}
          </select>

          <div className="form-buttons">

            <button
              className="submit-btn"
              onClick={addLabour}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : editId
                ? "Update Worker"
                : "Add Worker"}
            </button>

            {editId && (
              <button
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </div>
      )}

      {/* WORKER LIST */}

      <div className="labour-list">

        <h2>Registered Workers</h2>

        {labourList.length === 0 && (
          <p>No workers registered yet</p>
        )}

        <div className="labour-cards">

          {labourList.map((labour) => (

            <div key={labour._id} className="labour-card">

              <div className="labour-header">

                <div className="labour-name">
                  {labour.name}
                </div>

                <div className="labour-actions">

                  {isAdmin && (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => editLabour(labour)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteLabour(labour._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  <button
                    className="view-btn"
                    onClick={() => viewAttendance(labour._id, labour.name)}
                  >
                    Attendance
                  </button>

                </div>

              </div>

              <div className="labour-role">
                {roles.find(r => r.value === labour.role)?.icon}{" "}
                {roles.find(r => r.value === labour.role)?.label}
              </div>

              <div className="labour-wage">
                ₹{labour.wage}/day
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* ATTENDANCE MODAL */}

      {showAttendance && (

        <div className="attendance-modal">

          <div className="attendance-box">

            <div className="attendance-header">

              <h2>{selectedWorker} Attendance</h2>

              <button
                className="close-btn"
                onClick={() => setShowAttendance(false)}
              >
                ✕
              </button>

            </div>

            {attendanceData.length === 0 ? (

              <p className="no-attendance">
                No attendance records found
              </p>

            ) : (

              <div className="attendance-list">

                {attendanceData.map((record) => (

                  <div
                    key={record._id}
                    className="attendance-card"
                  >

                    <div className="attendance-date">
                      {new Date(record.date).toLocaleDateString()}
                    </div>

                    <div className={`attendance-status ${record.status}`}>
                      {record.status}
                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default LabourPage;