const express = require("express");
const app = express();
// const path = require("path");
const path = require("path");

const mongoose = require("./db");
require("dotenv").config(); // If using .env
const upRoute = require("./routes/files");

// 🔧 View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔧 Middleware
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true })); // Needed for forms
// const upRoute = require("./routes/files");
app.use("/upload", upRoute); 

// ✅ Route
// app.use("/", upRoute); // This covers both "/" and POST "/"

//🔊 Test Route (optional)
app.get("/", (req, res) => {
  res.render("index");
});


// app.get("/test", (req, res) => {
//   res.send("✅ Server is working!");
// });




// ✅ Server Start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
