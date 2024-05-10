import "../styles/ProductDetails.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus, AiOutlineShoppingCart } from "react-icons/ai";
import { useRef } from "react";
import Slider from "react-slick";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";
import SimilarProductCard from "../shared/SimilarProductCard";
import { useDispatch, useSelector } from "react-redux";
import { addToBuy, addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BsCartFill } from "react-icons/bs";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [singleProduct, setSingleProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (params?.slug) {
      getSingleProduct();
    }
  }, [params?.slug]);

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/all-products/${params.slug}`
      );
      setSingleProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/similar-product/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex === -1) {
      dispatch(addToCart(product));
      toast.success("Item Added To Cart");
    } else {
      navigate("/cart");
    }
  };

  const handleAddToBuy = (product) => {
    try {
      if (auth?.token) {
        const existingItemIndex = cartItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingItemIndex === -1) {
          dispatch(addToBuy(product));
          navigate("/checkout");
        } else {
          navigate("/checkout");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // logic of add to cart and go to cart
  const renderAddToCartButton = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex === -1) {
      return (
        <button
          className="add-cart-button w-100"
          onClick={() => handleAddToCart(product)}
        >
          <span className="mx-1">Add to Cart</span>
          <AiOutlineShoppingCart className="addToCartIcon" />
        </button>
      );
    } else {
      return (
        <button
          className="add-cart-button px-4 w-100"
          onClick={() => navigate("/cart")}
        >
          <span className="mx-2">Go to Cart</span>
          <BsCartFill className="addToCartIcon" />
        </button>
      );
    }
  };

  return (
    <div className="container">
      <div className="product-details-div mt-4 bg-light py-2">
        <div className="row">
          <div className="product-details col-lg-5 col-md-12 pt-2">
            <div className="product-gallery">
              {/* I am adding this check to prevent errors when accessing the 'id' property. If 'singleProduct.id' is undefined, we avoid rendering the images to prevent errors.*/}
              {singleProduct?._id && (
                <>
                  <img
                    src={`/api/v1/products/get-product-photo/${singleProduct?._id}`}
                    alt={singleProduct?.name}
                  />
                  <img
                    src={`/api/v1/products/get-product-photo/${singleProduct?._id}`}
                    alt={singleProduct?.name}
                  />
                  <img
                    src={`/api/v1/products/get-product-photo/${singleProduct?._id}`}
                    alt={singleProduct?.name}
                  />
                  <img
                    src={`/api/v1/products/get-product-photo/${singleProduct?._id}`}
                    alt={singleProduct?.name}
                  />
                </>
              )}
            </div>
            <div className="product-image mx-0 d-flex flex-column">
              {isLoading && (
                <div className="static-div d-flex justify-content-center align-items-center">
                  <ClipLoader className="loader" />
                </div>
              )}
              {singleProduct?._id && (
                <>
                  <div className="w-100 mb-2" style={{ height: "fit-content" }}>
                    <img
                      className="w-100"
                      src={`/api/v1/products/get-product-photo/${singleProduct.id}`}
                      alt={singleProduct.name}
                      onLoad={() => setIsLoading(false)} // Set isLoading to false when the image is loaded
                      style={{ display: isLoading ? "none" : "block" }} // Show the image when it's loaded
                    />
                  </div>

                  <div className="container d-lg-flex gap-lg-2 flex-sm-column gap-sm-1 justify-content-lg-center w-100 py-lg-0">
                    {renderAddToCartButton(singleProduct)}
                    <button
                      className="add-buy-button w-100"
                      onClick={() => handleAddToBuy(singleProduct)}
                    >
                      <span className="mx-1">Add to Buy</span>
                      <AiOutlinePlus className="addToCartIcon" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-7 col-md-12 mt-md-5 mt-sm-5 mt-lg-0">
            {isLoading ? (
              <div className="product-info px-lg-4 px-md-2 px-sm-2">
                <SkeletonTheme color="#f0f0f0" highlightColor="#ccc">
                  <div>
                    <Skeleton
                      height={30}
                      width={"50%"}
                      style={{ marginBottom: "15px" }}
                    />

                    <Skeleton
                      height={200}
                      width={"100%"}
                      style={{ marginBottom: "15px" }}
                    />

                    <Skeleton
                      count={5}
                      width={"100%"}
                      style={{ marginBottom: "6px" }}
                    />
                  </div>
                </SkeletonTheme>
              </div>
            ) : (
              <div className="product-info px-lg-5 px-md-2 py-2">
                <h1 className="text-dark-emphasis fw-bold">
                  {singleProduct.name}
                </h1>
                <p>{singleProduct.detailedDescription}</p>
                <p>Price: {singleProduct.price}</p>
                <p>Category: {singleProduct?.category?.name}</p>
                <p>Discount: {singleProduct.discountPercentage}</p>
                <p>Rating: {singleProduct.rating}</p>
                <p>Stock: {singleProduct.stock}</p>
                <p>Brand: {singleProduct.brand}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mt-4 similar-container">
        <h1 className="mb-4 fw-bold text-dark-emphasis">Similar Products</h1>
        {similarProducts?.length > 0 ? (
          <div className="slider-container">
            <Slider ref={sliderRef} {...settings}>
              {similarProducts.map((product) => (
                <SimilarProductCard
                  key={product.id}
                  handleAddToCart={handleAddToCart}
                  product={product}
                />
              ))}
            </Slider>
            <div className="slider-navigation">
              <div className="prev" onClick={goToPrev}>
                <FaCircleLeft />
              </div>
              <div className="next" onClick={goToNext}>
                <FaCircleRight />
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-center text-warning">
            No Similar Products Found
          </h3>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
