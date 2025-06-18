
const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const File = require("../models/File");
const { storage } = require("../cloudinary");

const upload = multer({ storage });
const router = express.Router();


router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("🔥 Upload route HIT");
    console.log("📁 File:", req.file);

    if (!req.file) {
      return res.status(400).send("❌ No file uploaded.");
    }

    const cloudUrl = req.file?.path || req.file?.secure_url;

    if (!cloudUrl) {
      console.log("❌ Cloudinary URL missing in req.file:", JSON.stringify(req.file, null, 2));
      return res.status(500).send("Something went wrong: file URL not found.");
    }

    const newFile = new File({
      filename: req.file.originalname,
      uuid: uuidv4(),
      path: cloudUrl,
      size: req.file.size || 0,
    });

    const response = await newFile.save();

    const baseURL = req.protocol + "://" + req.get("host");
const fileLink = `${baseURL}/files/${response.uuid}`;




    console.log("✅ UUID-based share link:", fileLink);

   res.render("success", { fileLink: String(fileLink) }); 
   console.log("✅ Final fileLink:", typeof fileLink, fileLink);

  } catch (err) {
    console.log("❌ Error:", JSON.stringify(err, null, 2));
    res.status(500).send(err.message || "Something went wrong");
  }
});


router.get("/files/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) return res.status(404).send("❌ File not found.");

    const downloadableLink = file.path.replace("/upload/", "/upload/fl_attachment/");
    res.render("publicfile", {
      fileName: file.filename,
      fileSize: (file.size / 1024).toFixed(1) + " KB",
      cloudLink: file.path,
      downloadLink: downloadableLink
    });
  } catch (err) {
    console.log("❌ Error:", JSON.stringify(err, null, 2));
    res.status(500).send(err.message || "Something went wrong");
  }
});
//for check server work or not

router.get("/ping", (req, res) => {
  console.log("📡 Ping route working");
  res.send("Ping OK");
});

module.exports = router;
