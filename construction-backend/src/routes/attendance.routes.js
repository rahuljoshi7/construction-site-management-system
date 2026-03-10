const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendance.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// MARK ATTENDANCE
router.post("/", verifyToken, attendanceController.markAttendance);

// GET ALL ATTENDANCE (Used for Dashboard)
router.get("/", verifyToken, attendanceController.getAttendance);

// GET ATTENDANCE BY WORKER
router.get("/worker/:labourId", verifyToken, attendanceController.getAttendanceByWorker);

// GET PAYROLL
router.get("/payroll/:id", verifyToken, attendanceController.getPayroll);

module.exports = router;