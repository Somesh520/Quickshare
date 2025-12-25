
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("./db");
require("dotenv").config();
const upRoute = require("./routes/files");


// View engine removed (Switched to React Frontend)


const cors = require("cors");
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

//end here 
app.use("/api", upRoute); // Changed to /api prefix for clarity if needed, or keep as "/"

app.get("/hi", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.render("index");
});


app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR HANDLER:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5050;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;
