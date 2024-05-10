const express = require("express");
const {
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
} = require("../controllers/authController.js");
const {
  requireSignin,
  isAdmin,
  isNotAdmin,
} = require("../middlewares/authMiddleware.js");

//* router object
const router = express.Router();

//* ------------------------- routing --------------------------
// REGISTERATION
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// Forgot Password
router.post("/reset-password", resetPasswordController);

// text routes
router.get("/test", requireSignin, isAdmin, testController);

// protected User route -(auth)
router.get("/user-auth", requireSignin, isNotAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// protected Admin route -(auth)
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// get All users
router.get("/users/all-users", requireSignin, isAdmin, getAllUsersController);

// Update user profile
router.put("/profile", requireSignin, updateUserProfileController);

// Update admin details
router.put(
  "/admin/details",
  requireSignin,
  isAdmin,
  updateAdminDetailsController
);

// orders - User
router.get("/orders", requireSignin, getOrdersController);

// All Orders - admin
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);
module.exports = router;
