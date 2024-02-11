const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();
const cors = require("cors");
const db = require("./models");
const setupAssociations = require("./associations/associations");

const appRouter = require("./routes/Routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://localhost:3000",
    methods: "GET, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-Type",
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", appRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

setupAssociations();

const options = {
  key: fs.readFileSync("SSLCert/localhost.key"),
  cert: fs.readFileSync("SSLCert/localhost.crt"),
};

require("dotenv").config();
const PORT = process.env.SERVER_PORT || 3001;

db.sequelize.sync().then(() => {
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

/* // No longer needed, now using https
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});*/

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
