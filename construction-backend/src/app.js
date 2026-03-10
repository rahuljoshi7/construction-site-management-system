const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const labourRoutes = require("./routes/labour.routes");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

// 🔥 Middleware FIRST
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🔥 Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/labour", labourRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("Construction Backend Running");
});

module.exports = app;