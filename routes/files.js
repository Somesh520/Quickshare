// ✅ routes/files.js (Updated for Cloudinary direct URL)
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
  if (!req.file || !req.file.path) {
    return res.status(400).send("❌ No file uploaded.");
  }

  // 🧠 1. File metadata store in MongoDB
  const newFile = new File({
    filename: req.file.originalname,
    uuid: uuidv4(),
    path: req.file.path, // ✅ Cloudinary URL
    size: req.file.size || 0,
  });

  const response = await newFile.save();

  // 🧠 2. Create final download link using extension
  const originalExt = path.extname(req.file.originalname); // 📦 e.g. '.pptx'
  const cloudUrl = req.file.path;
  const downloadLink = cloudUrl.replace("/upload/", "/upload/fl_attachment/");

  // 🧠 3. Send that link to success page
  res.render("success", { fileLink: downloadLink });
});


// ✅ Redirect route (optional if you still want UUID based access)
router.get("/files/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.status(404).send("❌ File not found.");

    res.redirect(file.path); // 🔁 Redirect to Cloudinary URL
 } catch (err) {
  console.log("❌ Error:", JSON.stringify(err, null, 2));
  return res.status(500).send(err.message || "Something went wrong");
}

});

module.exports = router;
