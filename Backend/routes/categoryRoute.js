const { requireSignin, isAdmin } = require("../middlewares/authMiddleware.js");
const formidable = require("express-formidable");

const {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryCOntroller,
  categoryPhotoController,
  getFeaturedCategoriesController,
} = require("../controllers/createCategoryController");

const express = require("express");
const router = express.Router();

router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  formidable(),
  createCategoryController
);

//update category`
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  formidable(),
  updateCategoryController
);

// get category-thumbnail
router.get("/category-thumbnail/:cid", categoryPhotoController);

//get All category
router.get("/all-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryCOntroller
);

// get fetch featured Category
router.get("/featured-categories", getFeaturedCategoriesController);

module.exports = router;
