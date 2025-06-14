// ✅ routes/files.js (Cleaned and Updated)
const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const File = require("../models/File");
const { storage } = require("../cloudinary");

const upload = multer({ storage });
const router = express.Router();

// ✅ Upload Route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).send("❌ No file uploaded.");
    }

    const newFile = new File({
      filename: req.file.originalname,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size || 0,
    });

    const response = await newFile.save();

    const cloudUrl = req.file.path || req.file.secure_url;
    const downloadLink = cloudUrl.replace("/upload/", "/upload/fl_attachment/");

    console.log("✅ Final Download Link:", downloadLink);
    res.render("success", { fileLink: downloadLink });
  } catch (err) {
    console.log("❌ Error:", JSON.stringify(err, null, 2));
    res.status(500).send(err.message || "Something went wrong");
  }
  console.log("🧪 File received:", req.file);
console.log("🌐 Raw URL:", req.file.path);
});

// ✅ UUID-based Redirect Route
router.get("/files/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.status(404).send("❌ File not found.");

    res.redirect(file.path);
  } catch (err) {
    console.log("❌ Error:", JSON.stringify(err, null, 2));
    res.status(500).send(err.message || "Something went wrong");
  }
});

module.exports = router;
