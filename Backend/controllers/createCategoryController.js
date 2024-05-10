const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");

// post create category
const createCategoryController = async (req, res) => {
  try {
    const { name, isFeatured } = req.fields;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, error: "Name is required" });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        success: false,
        msg: "Category with the same name already exists.",
      });
    }

    const category = new CategoryModel({
      name,
      isFeatured: isFeatured,
      slug: slugify(name),
    });

    if (req.files.thumbnail) {
      category.thumbnail.data = fs.readFileSync(req.files.thumbnail.path);
      category.thumbnail.contentType = req.files.thumbnail.type;
    } else {
      const noPicAvailable = fs.readFileSync(
        path.join(__dirname, "../../frontend/src/assets/img/NoPicAvailable.png")
      );
      category.thumbnail.data = noPicAvailable;
      category.thumbnail.contentType = "image/png";
    }
    await category.save();
    res.status(201).send({
      success: true,
      msg: "New Category Created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      msg: "Error in Category Creation",
    });
  }
};

const categoryPhotoController = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.cid).select(
      "thumbnail"
    );
    if (!category) {
      return res.status(404).send({
        success: false,
        msg: "Category not found",
      });
    }
    if (category.thumbnail && category.thumbnail.data) {
      res.set("Content-Type", category.thumbnail.contentType);
      return res.status(200).send(category.thumbnail.data);
    } else {
      return res.status(404).send({
        success: false,
        msg: "Thumbnail not found for the category",
      });
    }
  } catch (error) {
    console.error("Error while getting category photo:", error);
    res.status(500).send({
      success: false,
      msg: "Error while getting category photo",
      error: error.message,
    });
  }
};

//update category
const updateCategoryController = async (req, res) => {
  try {
    const { name, isFeatured } = req.fields;
    const { id } = req.params;
    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, isFeatured, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      msg: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      msg: "Error while updating category",
    });
  }
};

// get all category
const categoryControlller = async (req, res) => {
  try {
    const categories = await CategoryModel.find({}).select("-thumbnail");
    res.status(200).send({
      success: true,
      msg: "All Categories List",
      category: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "Error while getting all categories",
    });
  }
};

// single category
const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      msg: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "Error While getting Single Category",
    });
  }
};

//delete category
const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      msg: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error while deleting category",
      error,
    });
  }
};

// get fetch fetured Category
const getFeaturedCategoriesController = async (req, res) => {
  try {
    const featuredCategories = await CategoryModel.find({ isFeatured: true });
    res.status(200).send({
      success: true,
      msg: "Featured Categories Fetched Successfully",
      featuredCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      msg: "Error while fetching featured categories",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryCOntroller,
  categoryPhotoController,
  getFeaturedCategoriesController,
};
