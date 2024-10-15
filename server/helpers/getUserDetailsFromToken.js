const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const env = process.env.NODE_ENV || "STAGING";

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  try {
    const decode = jwt.verify(token, process.env[`JWT_SECRET_KEY_${env}`]);
    const user = await UserModel.findById(decode.id).select("-password");
    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }
    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return {
      message: "Invalid token",
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
