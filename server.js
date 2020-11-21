/** @format */

const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
// Connect Database
connectDB();

// init middleware to receive json requests
app.use(express.json({ extended: false }));

const mongoose = require("mongoose");

app.get("/", (req, res) => res.send("API Running"));

app.use(cors());
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
