const UserModel = require("../models/userModel.js");
const OrderModel = require("../models/orderModel.js");
const { hashPassword, comparePassword } = require("../utils/authHelper.js");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // validations
    if (!name) return res.send({ msg: "Name is Required !" });
    if (!email) return res.send({ msg: "Email is Required !" });
    if (!/^\S+@\S+\.\S{2,3}$/.test(email))
      return res.send({ msg: "Invalid Email Format!" }); // Modified Email format validation
    if (!password) return res.send({ msg: "Password is Required !" });
    if (password.length < 6)
      return res.send({ msg: "Password must be at least 6 characters long!" }); // Password length validation
    if (!phone) return res.send({ msg: "Phone number is Required !" });
    if (!/^\d{10}$/.test(phone))
      return res.send({
        msg: "Phone number must be 10 digits long and contain only numbers!",
      }); // Phone number validation
    if (!address) return res.send({ msg: "Address is Required !" });
    if (!answer) return res.send({ msg: "Answer is Required !" });

    // check user
    const existUser = await UserModel.findOne({ email });
    // exist user
    if (existUser)
      return res.status(200).send({
        success: true,
        msg: "Already Registered!",
      });

    // register user
    const hashedPassword = await hashPassword(password);
    // saving password
    const user = await new UserModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      msg: "User Registered Successfully !!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Registration!",
      error: error.message,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password)
      return res.status(404).send({
        success: false,
        msg: "Invalid email or password !",
      });

    // check user
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).send({
        success: false,
        msg: "Email is not Registered !",
      });
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(200).send({
        success: false,
        msg: "Invalid Password",
      });

    // token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      msg: "Login Successfully 0_0!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Login !",
      error: error.message,
    });
  }
};
// ResetPassword controller
const resetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res
        .status(400)
        .send({ msg: "Email, answer, and new password are required!" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (user.answer !== answer) {
      return res.status(400).send({ error: "Answer not matched" });
    }
    const hashed = await hashPassword(newPassword);
    await UserModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      msg: "Password Reset Successfully !!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

// test controller
const testController = (req, res) => {
  return res.send({
    msg: "Protected Route",
  });
};
// Update user profile
const updateUserProfileController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const user = await UserModel.findById(req.user._id);
    // password
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and 6 Character Long....",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined; // here we using undefined becoz if we dont want to change the passowrd.
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        email: email || user.email,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      msg: "Profile Updated Successfully !!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.send(400).send({
      success: false,
      msg: "Error While Update Profile",
      error,
    });
  }
};
// Update admin details
const updateAdminDetailsController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      res.status(404).json({ success: false, msg: "Admin not found" });
      return;
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();

    res.json({
      success: true,
      msg: "Admin profile updated successfully",
      updatedUser: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin profile update error:", error);
    res.status(500).json({
      success: false,
      msg: "An error occurred during admin profile update.",
    });
  }
};
// orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      buyer: req.user._id,
    })
      .populate("products", "-thumbnail")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      msg: "Error While Getting Orders",
      error,
    });
  }
};
// All orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({})
      .populate("products", "-thumbnail")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      msg: "Error While Getting Orders",
      error: error,
    });
  }
};
// Order Status
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error While Updating Order Status",
      error,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await UserModel.find({ role: { $ne: 1 } });
    res.json({ success: true, users: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  resetPasswordController,
  updateUserProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  updateAdminDetailsController,
  getAllUsersController,
};
