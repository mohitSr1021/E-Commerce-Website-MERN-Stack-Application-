const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
