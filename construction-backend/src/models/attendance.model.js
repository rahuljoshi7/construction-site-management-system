const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Labour = require("./labour.model");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    labourId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Labour,
        key: "id",
      },
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    shift: {
      type: DataTypes.ENUM("morning", "evening", "night"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("present", "absent", "half-day"),
      defaultValue: "present",
    },

    overtimeHours: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: "attendance",
    timestamps: true,
  }
);

// 🔥 RELATIONSHIP (VERY IMPORTANT)
Attendance.belongsTo(Labour, {
  foreignKey: "labourId",
  onDelete: "CASCADE",
});

module.exports = Attendance;