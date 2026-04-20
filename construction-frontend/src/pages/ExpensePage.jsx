import { useState, useEffect } from "react";
import API from "../services/api";
import "./ExpensePage.css";

function ExpensePage() {

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("misc");
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // FETCH EXPENSES
  // ===============================
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expense");
      setExpenses(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ===============================
  // ADD EXPENSE
  // ===============================
  const addExpense = async () => {

    if (!title.trim() || !amount) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await API.post("/expense", {
        title,
        amount: Number(amount),
        category
      });

      setTitle("");
      setAmount("");
      setCategory("misc");
      fetchExpenses();

    } catch (error) {
      console.error(error);
      alert("Failed to add expense");
    } finally {
      setIsSubmitting(false);
    }

  };

  // ===============================
  // DELETE EXPENSE
  // ===============================
  const deleteExpense = async (id) => {

    console.log("Deleting ID:", id); // DEBUG

    const confirmDelete = window.confirm("Delete this expense?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/expense/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }

  };

  const categories = [
    { value: "labour", label: "Labour", icon: "👷" },
    { value: "material", label: "Material", icon: "🧱" },
    { value: "misc", label: "Misc", icon: "📦" },
  ];

  return (

    <div className="expense-page">

      <h1>Expense Management</h1>

      <div className="expense-layout">

        {/* FORM */}
        <div className="expense-form-card">

          <h2>Add Expense</h2>

          <input
            className="expense-input"
            placeholder="Expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="expense-input"
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="expense-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.label}
              </option>
            ))}
          </select>

          <button
            className="expense-add-btn"
            onClick={addExpense}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Expense"}
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="expense-right">

          {/* TOTAL */}
          <div className="expense-total">
            <span className="expense-total-label">Total Expenditure</span>
            <span className="expense-total-value">
              ₹{total.toLocaleString()}
            </span>
          </div>

          {/* LIST */}
          <div className="expense-list-section">

            <h2>All Expenses</h2>

            {expenses.length === 0 ? (

              <div className="expense-empty">
                No expenses recorded yet
              </div>

            ) : (

              <div className="expense-list">

                {expenses.map((e) => (

                  <div key={e.id} className="expense-item">

                    <div className="expense-item-info">

                      <span className="expense-item-title">
                        {e.title}
                      </span>

                      <span className={`expense-item-category ${e.category}`}>
                        {categories.find(c => c.value === e.category)?.icon}{" "}
                        {e.category}
                      </span>

                    </div>

                    <div className="expense-item-right">

                      <span className="expense-item-amount">
                        ₹{Number(e.amount).toLocaleString()}
                      </span>

                      <button
                        className="expense-delete-btn"
                        onClick={() => deleteExpense(e.id)}  // ✅ FIXED
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default ExpensePage;