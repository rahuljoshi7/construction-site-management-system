require("dotenv").config(); // 🔥 load env FIRST

const app = require("./src/app");
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 5000;

/* =========================================
   CONNECT MYSQL & START SERVER
========================================= */
sequelize.sync()
  .then(() => {
    console.log("MySQL Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });