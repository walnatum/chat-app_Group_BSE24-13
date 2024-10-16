const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "STAGING";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const { connection } = mongoose;

    connection.on("connected", () => {
      console.log("Connect to DB");
    });

    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb ", error);
    });
  } catch (error) {
    console.log("Something is wrong ", error);
  }
}

module.exports = connectDB;
