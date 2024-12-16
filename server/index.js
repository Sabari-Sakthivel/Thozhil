const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/Database");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const CompanyRoutes=require('./routes/CompanyRoutes')
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type",'Authorization'],
  })
);

connectDB();

app.use(express.json());

// Serve uploaded files statically
//  User Routes
app.use("/user", userRoutes);

// Company Routes....

 app.use ("/company",CompanyRoutes)


// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
