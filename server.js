const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("./db");
require("dotenv").config(); 



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

app.use("/upload", require("./routes/files"));






app.get("/", (req, res) => {
  res.render("index");
});






const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
