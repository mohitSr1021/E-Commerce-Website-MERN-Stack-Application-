const formidable = require("express-formidable");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware.js");
const {
  ProductController,
  getProductController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  productPhotoController,
  productFiltersController,
  searchProductController,
  similarProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
  getFeaturedProductController,
} = require("../controllers/ProductController.js");

const express = require("express");
const router = express.Router();

// <======================================================= Routes =================================================================>

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  ProductController
);
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

//  All Products
router.get("/all-products", getProductController);

//  single Product
router.get("/all-products/:slug", getSingleProductController);

// get photo
router.get("/get-product-photo/:pid", productPhotoController);

//delete Product
router.delete("/delete-product/:pid", deleteProductController);

//filter Product
router.post("/product-filters", productFiltersController);

// Search Product
router.get("/product-search/:searchTerm", searchProductController);

// Similar product
router.get("/similar-product/:pid/:cid/", similarProductController);

// Category Based Product Page
router.get("/product-category/:slug", productCategoryController);

// Featured Products
router.get("/new-product-featured", getFeaturedProductController);

// <................. payments routes........................>

// token (from braintree for verification to do transaction)
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignin, braintreePaymentController);
module.exports = router;
