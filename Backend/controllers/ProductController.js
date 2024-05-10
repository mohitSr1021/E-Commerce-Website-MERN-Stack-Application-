const ProductModel = require("../models/productModel");
const CategoryModel = require("../models/categoryModel");
const OrderModel = require("../models/orderModel");
const slugify = require("slugify");
const fs = require("fs");
const braintree = require("braintree");
require("dotenv/config");

// payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Product Creation controller
const ProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      detailedDescription,
      price,
      priceUSD,
      discountPercentage,
      rating,
      stock,
      category,
      brand,
      shipping,
      isFeatured,
    } = req.fields; // getting these from the formidable()
    const { thumbnail } = req.files;
    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !detailedDescription:
        return res
          .status(400)
          .send({ error: "Detailed Description is Required" });
      case !price:
        return res
          .status(400)
          .send({ error: "Price is Required in Rupees (INR)" });
      case !priceUSD:
        return res
          .status(400)
          .send({ error: "Price is Required in Dollars (USD)" });
      case !discountPercentage:
        return res
          .status(400)
          .send({ error: "Discount Percentage is Required" });
      case !rating:
        return res.status(400).send({ error: "Rating is Required" });
      case !stock:
        return res.status(400).send({ error: "Stock is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !brand:
        return res.status(400).send({ error: "Brand is Required" });
      case thumbnail && thumbnail.size > 1572864:
        return res.status(400).send({
          error: "Thumbnail is Required and should be less then 1.5mb.",
        });
      case !isFeatured:
        return res.status(400).send({ error: "isFeatured is Required" });
    }

    // Check for duplicate product by name
    const existingProduct = await ProductModel.findOne({ name });

    if (existingProduct) {
      return res.status(400).send({
        success: false,
        msg: "Product with the same name already exists.",
      });
    }

    const products = new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (thumbnail) {
      products.thumbnail.data = fs.readFileSync(thumbnail.path);
      products.thumbnail.contentType = thumbnail.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      msg: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "Error in Creating Product",
    });
  }
};
// Get All products controller
const getProductController = async (req, res) => {
  const totalCount = await ProductModel.countDocuments({});
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const startIndex = (page - 1) * limit;
  try {
    const products = await ProductModel.find({})
      .select("-thumbnail") // it will not take thumbnail in initialtime.
      // .populate("category")
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit), // This line calculates the total number of pages needed to display all the products based on the total count of products (totalCount) and the limit of products per page (limit). It then rounds up this value to the nearest whole number using Math.ceil() to ensure that even if there's a fraction of a page, it will still be counted as a whole page. This ensures that you have enough pages to accommodate all products, even if the total count isn't evenly divisible by the limit.
      msg: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Erorr in getting products",
      error: error.msg,
    });
  }
};
// get single product controller
const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .select("-thumbnail")
      .populate("category"); // populate() method is use to show the details that is connected to the other.
    res.status(200).send({
      success: true,
      msg: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Eror while getitng single product",
      error,
    });
  }
};
// get product thumbnail
const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req?.params?.pid).select(
      "thumbnail"
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        msg: "Product not found",
      });
    }

    if (product.thumbnail && product.thumbnail.data) {
      res.set("Content-Type", product.thumbnail.contentType);
      return res.status(200).send(product.thumbnail.data);
    } else {
      return res.status(404).send({
        success: false,
        msg: "Thumbnail not found for the product",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("Error while getting product photo:", error);
    res.status(500).send({
      success: false,
      msg: "Error while Getting Product Photo",
      error: error.message,
    });
  }
};
//delete controller
const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-thumbnail");
    res.status(200).send({
      success: true,
      msg: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error while deleting product",
      error,
    });
  }
};
// update Controller
const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      detailedDescription,
      price,
      priceUSD,
      discountPercentage,
      rating,
      stock,
      category,
      brand,
      shipping,
      isFeatured,
    } = req.fields; // getting these from the formidable()
    const { thumbnail } = req.files;
    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !detailedDescription:
        return res
          .status(400)
          .send({ error: "Detailed Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required in INR" });
      case !priceUSD:
        return res
          .status(400)
          .send({ error: "Price is Required in Dollars $" });
      case !discountPercentage:
        return res
          .status(400)
          .send({ error: "Discount Percentage is Required" });
      case !rating:
        return res.status(400).send({ error: "Rating is Required" });
      case !stock:
        return res.status(400).send({ error: "Stock is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !brand:
        return res.status(400).send({ error: "Brand is Required" });
      case thumbnail && thumbnail.size > 1572864:
        return res.status(400).send({
          error: "Thumbnail is Required and should be less then 1.5mb.",
        });
      case !isFeatured:
        return res.status(400).send({ error: "isFeatured is Required" });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (thumbnail) {
      products.thumbnail.data = fs.readFileSync(thumbnail.path);
      products.thumbnail.contentType = thumbnail.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Product",
    });
  }
};
// Filter by category
const productFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      msg: "Error While filtering Products !!",
      error,
    });
  }
};
// Search Product
const searchProductController = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const results = await ProductModel.find({
      // a logical OR operation on an array of two or more expressions, and selects the documents that satisfy at least one of the expressions.
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { detailedDescription: { $regex: searchTerm, $options: "i" } },
      ],
    }).select("-thumbnail");
    res.status(200).json({
      success: true,
      results: results,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      msg: "Error in Search Product API",
      error,
    });
  }
};
// Similar Products
const similarProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-thumbnail")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      msg: "error while getting Similar Product",
      error,
    });
  }
};
// Category Based Product
const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({
      slug: req.params.slug,
    });
    const products = await ProductModel.find({
      category,
    }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.send(400).send({
      success: false,
      error,
      msg: "Error While Getting Products",
    });
  }
};
// get latest products - featured
const getFeaturedProductController = async (req, res) => {
  try {
    const featuredProducts = await ProductModel.find({ isFeatured: true });
    res.status(200).send({
      success: true,
      featuredProducts,
      msg: "Fetched Latest Featured Products !",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

// <====================================== payment gateway apis ==================================================>

// token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// payment
const braintreePaymentController = async (req, res) => {
  try {
    const { cartItems, nonce } = req.body;
    let total = 0;
    cartItems.map((item) => (total += item.priceUSD));
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: cartItems,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({
            ok: true,
          });
        } else {
          res.status(500).send({
            error,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
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
};
