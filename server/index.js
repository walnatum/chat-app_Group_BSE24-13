const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookiesParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const { app, server } = require("./socket/index");

const env = process.env.NODE_ENV || "STAGING";

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://agreeable-coast-0a724d403.5.azurestaticapps.net/'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookiesParser());

const { PORT } = process.env;

app.get("/", (request, response) => {
  response.json({
    message: `Server running at ${PORT}`,
  });
});

// api endpoints
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
});
