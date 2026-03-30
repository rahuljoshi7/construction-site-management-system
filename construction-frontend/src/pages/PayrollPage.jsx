import { useState, useEffect } from "react";
import API from "../services/api";
import "./PayrollPage.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PayrollPage() {

  const [labours, setLabours] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =========================================
     FETCH WORKERS
  ========================================= */
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await API.get("/labour");
        setLabours(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch workers", error);
      }
    };

    fetchWorkers();
  }, []);

  /* =========================================
     CALCULATE PAYROLL
  ========================================= */
  const calculatePayroll = async () => {
    if (!selectedWorker) {
      alert("Please select a worker");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(`/attendance/payroll/${selectedWorker}`);
      setPayroll(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to calculate payroll");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     DOWNLOAD PDF
  ========================================= */
  const downloadPDF = async () => {
    const element = document.getElementById("salary-slip");

    if (!element) {
      alert("No data to export");
      return;
    }

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 0);
      pdf.save("salary-slip.pdf");

    } catch (error) {
      console.error("PDF generation failed", error);
    }
  };

  return (
    <div className="payroll-page">

      <h1>Payroll Calculator</h1>

      {/* SELECT WORKER */}
      <select
        value={selectedWorker}
        onChange={(e) => setSelectedWorker(e.target.value)}
      >
        <option value="">Select Worker</option>

        {labours.map(worker => (
          <option key={worker.id} value={worker.id}> {/* ✅ FIXED */}
            {worker.name}
          </option>
        ))}
      </select>

      {/* CALCULATE BUTTON */}
      <button onClick={calculatePayroll} disabled={loading}>
        {loading ? "Calculating..." : "Calculate Salary"}
      </button>

      {/* SALARY DISPLAY */}
      {payroll && (
        <div className="salary-card">

          {/* PDF CONTENT */}
          <div id="salary-slip">

            <h2>Salary Slip</h2>

            <hr />

            <p><strong>Worker Name:</strong> {payroll.worker}</p>
            <p><strong>Daily Wage:</strong> ₹{payroll.dailyWage}</p>
            <p><strong>Present Days:</strong> {payroll.presentDays}</p>
            <p><strong>Half Days:</strong> {payroll.halfDays}</p>
            <p><strong>Overtime Hours:</strong> {payroll.overtimeHours}</p>

            <hr />

            <h3>Total Salary: ₹{payroll.totalSalary}</h3>

            <p style={{ marginTop: "20px", fontSize: "12px" }}>
              Generated on: {new Date().toLocaleDateString()}
            </p>

          </div>

          {/* DOWNLOAD BUTTON */}
          <button onClick={downloadPDF}>
            Download Salary Slip
          </button>

        </div>
      )}

    </div>
  );
}

export default PayrollPage;