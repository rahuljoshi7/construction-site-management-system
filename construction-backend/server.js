require("dotenv").config(); // 🔥 load env FIRST

const app = require("./src/app");
const sequelize = require("./src/config/db");
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;

const PORT = process.env.PORT || 5000;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
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

  