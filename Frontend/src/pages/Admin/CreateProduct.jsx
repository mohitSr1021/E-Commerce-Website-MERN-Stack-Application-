import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { Image } from "antd";
import { Select } from "antd";
import { IoStarOutline } from "react-icons/io5";
const { Option } = Select;
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [priceUSD, setPriceUSD] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleRemoveImage = () => {
    setThumbnail(null);
  };

  // Convert price to USD whenever price changes
  useEffect(() => {
    const convertPriceToUSD = () => {
      const priceUSD = (price / 83).toFixed(2);
      setPriceUSD(priceUSD);
    };
    convertPriceToUSD();
  }, [price]);

  // Get all Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category !!");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("detailedDescription", detailedDescription);
      productData.append("price", price);
      productData.append("priceUSD", priceUSD);
      productData.append("discountPercentage", discountPercentage);
      productData.append("rating", rating);
      productData.append("stock", stock);
      productData.append("category", category);
      productData.append("brand", brand);
      productData.append("thumbnail", thumbnail);
      productData.append("shipping", shipping);
      productData.append("isFeatured", isFeatured);
      const { data } = await axios.post(
        "/api/v1/products/create-product/",
        productData,
        { headers: { Authorization: authToken } }
      );

      if (data?.success) {
        toast.success("Product Created Successfully !");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !");
    }
  };

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex align-items-center justify-content-center flex-column">
          <h1 className="w-100 mt-0 mb-3 fw-bold text-dark-emphasis">CreateProduct</h1>
          <div className="w-100 m-1 create-product-div w-75">
            <div className="mb-3">
              <label htmlFor="productCategory" className="form-lable fw-bold">
                Product Category Details:
              </label>
              <Select
                style={{ padding: "1px 0px", border: "none" }}
                showSearch
                placeholder="Select a Category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((cat) => (
                  <Option key={cat.id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mb-3">
              <label htmlFor="productThumbnail" className="form-lable fw-bold">
                Product Thumbnail Details:
              </label>
              <div className="row my-2">
                {thumbnail && (
                  <div className="col-md-2">
                    <div className="position-relative">
                      <Image
                        width={100}
                        height={100}
                        src={URL.createObjectURL(thumbnail)}
                        alt={thumbnail.name}
                        footer={null}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={handleRemoveImage}
                      >
                        <span className="fw-bold">X</span>
                      </button>
                    </div>
                  </div>
                )}
                <div className={thumbnail ? "col-md-10" : "col-md-12"}>
                  <label
                    htmlFor="uploadThumbnail"
                    className="btn btn-light border col-md-12 d-flex justify-content-center align-items-center"
                  >
                    <FcAddImage
                      style={{
                        marginRight: "0.5rem",
                        height: "28px",
                        width: "28px",
                      }}
                    />
                    {thumbnail ? thumbnail.name : "Upload Product Thumbnail"}
                    <input
                      id="uploadThumbnail"
                      type="file"
                      name="Image"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label fw-bold">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productDescription"
                className="form-label fw-bold"
              >
                Product Description:
              </label>
              <textarea
                className="form-control"
                placeholder="Enter Short Description about Product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productDetailedDescription"
                className="form-label fw-bold"
              >
                Product Detailed Description:
              </label>
              <textarea
                className="form-control"
                placeholder="Enter Detailed Description about Product..."
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label fw-bold">
                Product Price in INR (₹):
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label fw-bold">
                Product Price in USD ($):
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Price in USD ($)"
                value={priceUSD}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productDiscount" className="form-label fw-bold">
                Discount Percentage %:
              </label>
              <input
                type="number"
                className="form-control"
                value={discountPercentage}
                onChange={(e) =>
                  setDiscountPercentage(parseFloat(e.target.value))
                }
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productRating"
                className="form-label fw-bold d-flex align-items-center gap-1"
              >
                Product Rating out of (5) <IoStarOutline />:
              </label>
              <input
                type="number"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productStock" className="form-label fw-bold">
                Product in Stock Details:
              </label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productBrand" className="form-label fw-bold">
                Product Brand Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productShipping" className="form-label fw-bold">
                Product Shipping Details:
              </label>
              <Select
                style={{ border: "none", padding: "1px 0px" }}
                showSearch
                placeholder="Select Shipping Option"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div className="mb-3">
              <label htmlFor="productFeatured" className="form-label fw-bold">
                Product Featured ? Yes / No:
              </label>
              <Select
                style={{ border: "none", padding: "1px 0px" }}
                showSearch
                placeholder="Do you want to feature this product?"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setIsFeatured(value);
                }}
              >
                <Option value="1">Yes</Option>
                <Option value="0">NO</Option>
              </Select>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleCreateProduct}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
