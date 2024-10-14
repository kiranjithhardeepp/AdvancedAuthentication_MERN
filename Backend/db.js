const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Uri = process.env.Mongo_Uri;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(Uri);
    console.log(
      `Connected successfully to MongoDB with ${conn.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // 1 for failure 0 for success
  }
};

module.exports = connectDb;
