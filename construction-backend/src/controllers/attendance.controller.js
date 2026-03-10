const Attendance = require("../models/attendance.model");
const Labour = require("../models/labour.model");

/* =========================================
   MARK ATTENDANCE
========================================= */

exports.markAttendance = async (req, res) => {

  try {

    const { labour, status, shift, overtimeHours } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // CHECK IF ATTENDANCE ALREADY EXISTS

    const existingAttendance = await Attendance.findOne({
      labour: labour,
      shift: shift,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (existingAttendance) {

      return res.status(400).json({
        message: "Attendance already marked for this shift today"
      });

    }

    const attendance = await Attendance.create({
      labour,
      status,
      shift,
      overtimeHours
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      data: attendance
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};


/* =========================================
   GET ALL ATTENDANCE
========================================= */

exports.getAttendance = async (req, res) => {

  try {

    const records = await Attendance
      .find()
      .populate("labour", "name wage")
      .sort({ date: -1 });

    res.json({
      message: "Attendance records fetched",
      data: records
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


/* =========================================
   GET ATTENDANCE OF A SPECIFIC WORKER
========================================= */

exports.getAttendanceByWorker = async (req, res) => {

  try {

    const workerId = req.params.labourId;

    const records = await Attendance
      .find({ labour: workerId })
      .populate("labour", "name wage")
      .sort({ date: -1 });

    res.json({
      message: "Attendance records fetched",
      data: records
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};


/* =========================================
   PAYROLL CALCULATION
========================================= */

exports.getPayroll = async (req, res) => {

  try {

    const labourId = req.params.id;

    const labour = await Labour.findById(labourId);

    if (!labour) {

      return res.status(404).json({
        message: "Worker not found"
      });

    }

    const attendance = await Attendance.find({
      labour: labourId
    });

    let presentDays = 0;
    let halfDays = 0;
    let overtimeHours = 0;

    attendance.forEach((record) => {

      if (record.status === "present") {
        presentDays++;
      }

      if (record.status === "half-day") {
        halfDays++;
      }

      overtimeHours += record.overtimeHours || 0;

    });

    const dailyWage = labour.wage;

    const totalSalary =
      (presentDays * dailyWage) +
      (halfDays * (dailyWage / 2)) +
      (overtimeHours * 50);

    res.json({

      worker: labour.name,
      dailyWage,
      presentDays,
      halfDays,
      overtimeHours,
      totalSalary

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Payroll calculation failed",
      error: error.message
    });

  }

};