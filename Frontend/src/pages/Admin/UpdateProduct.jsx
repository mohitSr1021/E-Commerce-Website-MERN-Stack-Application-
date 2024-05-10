import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Image } from "antd";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { FcAddImage } from "react-icons/fc";
import { IoStarOutline } from "react-icons/io5";
import { MdOutlineStar } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";

const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [priceUSD, setPriceUSD] = useState();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [pid, setID] = useState("");

  useEffect(() => {
    const convertPriceToUSD = () => {
      const priceUSD = (price / 83).toFixed(2);
      setPriceUSD(priceUSD);
    };
    convertPriceToUSD();
  }, [price]);

  // GET Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/all-products/${params.slug}`
      );
      setName(data.product.name);
      setCategory(data.product.category.id);
      setThumbnail(data.product.thumbnail);
      setDescription(data.product.description);
      setDetailedDescription(data.product.detailedDescription);
      setPrice(data.product.price);
      setDiscountPercentage(data.product.discountPercentage);
      setRating(data.product.rating);
      setStock(data.product.stock);
      setBrand(data.product.brand);
      setShipping(data.product.shipping);
      setIsFeatured(data.product.isFeatured);
      setID(data.product.id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // GET all Category
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category !!");
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // PUT Update Product Details
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      thumbnail && productData.append("thumbnail", thumbnail);
      productData.append("shipping", shipping);
      productData.append("isFeatured", isFeatured);
      const { data } = await axios.put(
        `/api/v1/products/update-product/${pid}`,
        productData,
        { headers: { Authorization: authToken } }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully !");
        setTimeout(() => {
          navigate("/dashboard/admin/products/");
        }, 2000);
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !");
    } finally {
      setLoading(false);
    }
  };

  // DELETE Product Deletion
  const handleDeleteProduct = async () => {
    try {
      const answer = window.prompt(
        "Are you Sure -_0 you want to Delete the Product ?"
      );
      if (answer) {
        const authToken = JSON.parse(localStorage.getItem("userInfo")).token;
        const { data } = await axios.delete(
          `/api/v1/products/delete-product/${pid}`,
          {
            headers: { Authorization: authToken },
          }
        );
        if (data?.success) {
          toast.success(data.msg);
          navigate("/dashboard/admin/products/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex align-items-center justify-content-center flex-column">
          <h1 className="w-100 px-2 mt-0 mb-3 text-dark-emphasis fw-bold">
            Update Product Details
          </h1>
          <div className="w-100 m-1 create-product-div">
            <h6 className="text-danger">
              Note: Images may take a moment to load.
            </h6>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label label fw-bold">
                Current Product Name:
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
              <label htmlFor="productCategory" className="form-label fw-bold">
                Product Category <MdOutlineStar className="text-danger" />:
              </label>
              {loading ? (
                <div className="loader-container">
                  <ClipLoader className="loader" />
                </div>
              ) : (
                <Select
                  style={{ padding: "1px 0px", border: "none" }}
                  placeholder="Select a Category"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>

            <div className="row my-2">
              <label htmlFor="ProductThumbnail" className="form-label fw-bold">
                Current Product Thumbnail:
              </label>
              {thumbnail ? (
                <div className="col-md-2">
                  <div className="position-relative">
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(thumbnail)}
                      alt={thumbnail?.name}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    >
                      <span className="fw-bold">X</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-md-2">
                  <div className="position-relative">
                    {loading ? (
                      <div className="loader-container">
                        <ClipLoader className="loader" />
                      </div>
                    ) : (
                      <Image
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                        src={`/api/v1/products/get-product-photo/${pid}`}
                      />
                    )}
                  </div>
                </div>
              )}
              <div className={thumbnail ? "col-md-10" : "col-md-12"}>
                <label
                  htmlFor="uploadThumbnail"
                  className="btn btn-light border col-md-12 d-flex justify-content-center align-items-center mt-2"
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

            <div className="mb-3">
              <label
                htmlFor="productDescription"
                className="form-label fw-bold"
              >
                Current Description:
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
                Current Detailed Description:
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
                Current Product Price in INR (&#8377;):
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Price in INR"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label fw-bold">
                Current Product Price in Dollars ($):
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Product Price in Dollars"
                defaultValue={priceUSD}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productDiscount" className="form-label fw-bold">
                Currently Discount Percentage %:
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
                Average User Rating out of (5) <IoStarOutline />:
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
                Currently Product In Stock:
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
                Current Product Brand Name:
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
              <label htmlFor="productFeatured" className="form-label fw-bold">
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
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">NO</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div className="mb-3">
              <label htmlFor="productFeatured" className="form-label fw-bold">
                Is Featured ?
              </label>
              <Select
                style={{ border: "none", padding: "1px 0px" }}
                showSearch
                placeholder="Do you want to feature this product?"
                size="large"
                className="form-select mb-3"
                onChange={(value) => {
                  setIsFeatured(value === "1" ? true : false);
                }}
                value={isFeatured ? "1" : "0"}
              >
                <Option value="1">Yes</Option>
                <Option value="0">NO</Option>
              </Select>
            </div>
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={handleUpdateProduct}
            >
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {!loading && "Update Product"}
            </button>
            <button
              className="btn btn-danger w-100"
              onClick={handleDeleteProduct}
            >
              {loading && (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {!loading && "Delete Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
