const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Material = sequelize.define(
  "Material",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    unit: {
      type: DataTypes.STRING,
      defaultValue: "kg",
    },

    pricePerUnit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "materials",
    timestamps: true,
  }
);

module.exports = Material;