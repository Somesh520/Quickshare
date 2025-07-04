const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  uuid: String,
  path: String,
  size: Number,
 
createdAt: {
  type: Date,
  default: Date.now,
  expires: 86400 
}

});

module.exports = mongoose.model("File", fileSchema);
