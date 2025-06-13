const mongoose = require('mongoose');
require('dotenv').config();

const mongourl = process.env.MONGO_URI;

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


const db = mongoose.connection;
db.on('disconnected', () => {
    console.log("⚠️ MongoDB disconnected");
});

module.exports = db;
