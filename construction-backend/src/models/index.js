const sequelize = require("../config/db");

const Labour = require("./labour.model");
const Attendance = require("./attendance.model");
const User = require("./user.model");
const Expense = require("./expense.model");
const Material = require("./material.model");

/* ==============================
   REGISTER MODELS
============================== */

const models = {
  Labour,
  Attendance,
  User,
  Expense,
  Material,
};

/* ==============================
   ASSOCIATIONS (if needed)
============================== */

// Example:
Labour.hasMany(Attendance, { foreignKey: "labourId" });
Attendance.belongsTo(Labour, { foreignKey: "labourId" });

/* ==============================
   EXPORT
============================== */

module.exports = {
  sequelize,
  ...models,
};