
const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const File = require("../models/File");
const { storage } = require("../cloudinary");

// Short ID Generator (8 chars hex = 4 bytes)
const generateShortId = () => crypto.randomBytes(4).toString("hex");

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/zip" ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/x-zip-compressed" ||
      file.mimetype === "application/octet-stream" // common for zips
    ) {
      cb(null, true);
    } else {
      cb(new Error("❌ Only Images, Videos, PDFs, and Zip files are allowed."));
    }
  }
});

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("🔥 Upload route HIT");
    // console.log("📁 File:", req.file);

    if (!req.file) {
      return res.status(400).send("❌ No file uploaded.");
    }

    const cloudUrl = req.file?.path || req.file?.secure_url;

    if (!cloudUrl) {
      console.log("❌ Cloudinary URL missing");
      return res.status(500).send("Something went wrong: file URL not found.");
    }

    // Create file with SHORT ID
    const newFile = new File({
      filename: req.file.originalname,
      uuid: generateShortId(),
      path: cloudUrl,
      size: req.file.size || 0,
    });

    const response = await newFile.save();

    const baseURL = req.protocol + "://" + req.get("host");
    // Ensure /api prefix is present if routes are mounted there
    const fileLink = `${baseURL}/api/files/${response.uuid}`;

    console.log("✅ Share link:", fileLink);
    res.json({ fileLink });

  } catch (err) {
    console.error("❌ FULL ERROR STACK:", err);
    res.status(500).send(err.message || "Something went wrong");
  }
});


router.get("/files/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.status(404).render("error", { message: "File not found or expired." });

    // Generate downloadable transformation if possible (cloudinary)
    // For raw files, it might stay same. For images/videos we can add flags.
    let downloadableLink = file.path;
    if (file.path.includes("/upload/")) {
      downloadableLink = file.path.replace("/upload/", "/upload/fl_attachment/");
    }

    res.render("publicfile", {
      fileName: file.filename,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
      cloudLink: file.path,
      downloadLink: downloadableLink
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("Something went wrong");
  }
});


router.get("/ping", (req, res) => {
  console.log("📡 Ping route working");
  res.send("Ping OK");
});

module.exports = router;
