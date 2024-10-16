const mongoose = require("mongoose");

const env = process.env.NODE_ENV || "STAGING";

async function connectDB() {
  try {
    // change this to use env variables too!
    const URI = 'mongodb+srv://nangosha:x65zN1KDQqjePQ8F@chat-app-staging.latgo.mongodb.net/?retryWrites=true&w=majority&appName=chat-app-staging'
    await mongoose.connect(URI);

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
