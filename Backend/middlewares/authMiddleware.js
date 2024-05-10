const JWT = require("jsonwebtoken");
const UserModel = require("../models/userModel");

// Protected Routes Token based
const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
    res.send;
  } catch (error) {
    console.log(Error);
  }
};

// Admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    // here check the user is admin or not by checking role property of user 0 or 1.
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        msg: "UnAuthorized Access !",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(401).send({
      success: false,
      msg: "Error in Admin Middleware !",
      error,
    });
  }
};


const isNotAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user && user.role === 0) {
      next();
    } else {
      res.status(403);
      throw new Error("User access denied");
    }
  } catch (error) {
    console.error("Error in isNotAdmin middleware:", error);
    res.status(403).json({ error: "User access denied" });
  }
};

module.exports = { requireSignin, isAdmin,isNotAdmin };
