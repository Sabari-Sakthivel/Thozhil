// index.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/Database");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
connectDB();

app.use(express.json());

// Routes
app.use("/user", userRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
