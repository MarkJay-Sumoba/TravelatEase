const express = require("express");
// const https = require("https");
// const fs = require("fs");
const app = express();
const cors = require("cors");
const db = require("./models");
const setupAssociations = require("./associations/associations");
const path = require("path");

const appRouter = require("./routes/Routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://travelatease01.netlify.app/",
    methods: "GET, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-Type",
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle the request for root
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "https://travelatease01.netlify.app/public/index.html")
  );
});

// Handle the request favicon.ico
app.get("/favicon.ico", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "https://travelatease01.netlify.app/public/favicon.ico"
    )
  );
});

// Serve static files from the client/public folder
app.use(
  "/static",
  express.static(
    path.join(__dirname, "https://travelatease01.netlify.app/public")
  )
);

// Routes
app.use("/api", appRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

setupAssociations();

require("dotenv").config();
const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
