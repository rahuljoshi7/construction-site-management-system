import { useState, useEffect } from "react";
import API from "../services/api";
import "./PayrollPage.css";
function PayrollPage() {

  const [labours, setLabours] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [payroll, setPayroll] = useState(null);

  useEffect(() => {

    const fetchWorkers = async () => {

      const res = await API.get("/labour");

      setLabours(res.data.data);

    };

    fetchWorkers();

  }, []);

  const calculatePayroll = async () => {

    if (!selectedWorker) {
      alert("Select worker");
      return;
    }

    const res = await API.get(`/attendance/payroll/${selectedWorker}`);

    setPayroll(res.data);

  };

  return (

    <div className="payroll-page">

      <h1>Payroll Calculator</h1>

      <select
        value={selectedWorker}
        onChange={(e) => setSelectedWorker(e.target.value)}
      >

        <option value="">Select Worker</option>

        {labours.map(worker => (

          <option key={worker._id} value={worker._id}>
            {worker.name}
          </option>

        ))}

      </select>

      <button onClick={calculatePayroll}>
        Calculate Salary
      </button>

      {payroll && (

        <div className="salary-card">

          <h2>{payroll.worker}</h2>

          <p>Daily Wage: ₹{payroll.dailyWage}</p>

          <p>Present Days: {payroll.presentDays}</p>

          <p>Half Days: {payroll.halfDays}</p>

          <p>Overtime Hours: {payroll.overtimeHours}</p>

          <h3>Total Salary: ₹{payroll.totalSalary}</h3>

        </div>

      )}

    </div>

  );

}

export default PayrollPage;