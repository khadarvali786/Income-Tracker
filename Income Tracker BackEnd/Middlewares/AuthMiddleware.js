const User = require("../Model/userModel");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  console.log(`auth token: ${token} `);
  console.log("ENV tokenKey", process.env.TOKEN_KEY);
  if (!token) {
    return res.json({ status: false });
  }
  // console.log(`auth token: ${token} `);
  // console.log("ENV tokenKey", process.env.TOKEN_KEY);
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    console.log("decoded data", err, data);
    if (err) {
      return res.json({ status: false, error: err });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          username: user.username,
          userId: user._id,
        });
      else return res.json({ status: false });
    }
  });
};

module.exports.authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(`authenticate token: ${token} `);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
