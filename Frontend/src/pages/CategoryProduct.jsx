import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaDollarSignSolid } from "react-icons/lia";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import { BsCartFill } from "react-icons/bs";
import { addToCart } from "../redux/slices/cartSlice";

const CategoryProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  // Category banners
  const categoryBanner = {
    perfumes:
      "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    watches:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    headphones:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tshirts:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shoes:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    jeans:
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    laptop:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skincare:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    smartphones:
      "https://images.unsplash.com/photo-1604671368394-2240d0b1bb6c?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  const selectedCategory = categoryBanner[params?.slug];

  useEffect(() => {
    const getCategoryBasedProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/v1/products/product-category/${params.slug}`
        );
        setProducts(data?.products);
        setCategory(data?.category);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (params?.slug) {
      getCategoryBasedProducts();
    }
  }, [params?.slug]);

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex === -1) {
      dispatch(addToCart(product));
      toast.success("Item Added To Cart");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="container mb-4" style={{ minHeight: "120vh" }}>
      {loading ? (
        <div className="loader-container" style={{ height: "100vh" }}>
          <ClipLoader className="loader" />
        </div>
      ) : (
        <div className="row">
          {params.slug && categoryBanner[params.slug] && (
            <div className="col-lg-12 mb-3">
              <img
                src={selectedCategory}
                className="categoryBanner"
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
                alt={params.slug}
              />
            </div>
          )}

          <div className="col-lg-12 category-product-container d-flex justify-content-center flex-wrap">
            {products.length > 0 ? (
              products.map((product) => {
                const isInCart = cartItems.some(
                  (item) => item._id === product._id
                );
                return (
                  <div
                    className="product-card position-relative"
                    key={product._id}
                  >
                    <button
                      className="px-1 view-more position-absolute top-0"
                      onClick={() => navigate(`/product/${product?.slug}`)}
                    >
                      View More Details
                    </button>
                    <div className="image-container">
                      <img
                        src={`/api/v1/products/get-product-photo/${product?._id}`}
                        alt={product.name}
                      />
                    </div>
                    <h5 className="mt-3 mb-1 px-1 fw-bold">
                      {product.name.substring(0, 45)}
                    </h5>
                    <div className="px-1 fw-bold text-warning">
                      Brand{" "}
                      <span className="text-info-emphasis">
                        {product.brand}
                      </span>
                    </div>
                    <div className="details px-1">
                      <div className="description mt-1">
                        <p className="mb-0 mt-1">
                          {product.detailedDescription.substring(0, 90)}...
                        </p>
                      </div>
                    </div>
                    <div className="details-bottom d-flex align-items-center justify-content-between px-1">
                      <div className="rating-container my-1 d-flex align-items-center">
                        <span>{product.rating}</span>
                        <RiStarSFill className="rating" />
                      </div>
                      <div className="mx-3 text-success">
                        {product.discountPercentage} <span>% off</span>
                      </div>
                    </div>

                    <div className="mt-1">
                      <h5 className="fw-bold d-flex mb-0 px-1">
                        <div className="d-flex align-items-center">
                          <span className="mx-1">&#x24;</span>
                          {product.priceUSD}
                          <span>/-</span>
                        </div>
                      </h5>
                    </div>

                    <div className="addToCart py-1">
                      <p className="fw-bold d-flex align-items-center mb-0 px-1">
                        <LiaDollarSignSolid className="fa-icon-react mb-1" />
                        <span>{product.priceUSD}/-</span>
                      </p>
                      <button
                        className="py-1 px-1 d-flex align-items-center gap-1"
                        onClick={() => handleAddToCart(product)}
                      >
                        {isInCart ? "Go to Cart" : "Add to Cart"}
                        {isInCart ? (
                          <BsCartFill className="addToCartIcon" />
                        ) : (
                          <AiOutlineShoppingCart className="addToCartIcon" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-lg-12 text-center mt-5">
                <h2>No products available for this category</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
