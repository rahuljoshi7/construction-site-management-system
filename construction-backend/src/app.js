const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const labourRoutes = require("./routes/labour.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const materialRoutes = require("./routes/material.routes");
const expenseRoutes = require("./routes/expense.routes");
const viewRoutes = require("./routes/view.routes");


const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
/* =========================================
   MIDDLEWARE
========================================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =========================================
   ROUTES
========================================= */

app.use("/api/auth", authRoutes);
app.use("/api/labour", labourRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/material", materialRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/", viewRoutes);
/* =========================================
   ROOT ROUTE
========================================= */
app.get("/", (req, res) => {
  res.send("Construction Backend Running 🚀");
});

module.exports = app;