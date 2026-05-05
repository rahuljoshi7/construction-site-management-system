const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Labour = sequelize.define(
  "Labour",
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

    wage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "labours",
    timestamps: true,
  }
);

module.exports = Labour;