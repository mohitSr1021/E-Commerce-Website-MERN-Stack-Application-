import "../styles/ProductsSection.css";
import { RiStarSFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "../shared/Pagination";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const ProductsSection = ({ checked, products }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, currentPage, totalPages } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!checked?.length) {
      dispatch(fetchProducts({ page: currentPage }));
    }
  }, [dispatch, checked, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchProducts({ page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchProducts({ page: currentPage + 1 }));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item Added To Cart");
  };

  return (
    <div className="ProductsSection d-flex justify-content-center flex-wrap">
      {isLoading ? (
        <div className="loader-container">
          <ClipLoader className="loader" />
        </div>
      ) : products?.length === 0 ? ( // If no products found
        <div className="no-products">
          <p>No products available</p>
        </div>
      ) : (
        <>
          {products?.map((product) => (
            <div className="product-card position-relative" key={product._id}>
              <button
                className="px-1 view-more position-absolute top-0"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                View More Details
              </button>
              <div className="image-container">
                <img
                  src={`/api/v1/products/get-product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>
              <h5 className="mt-3 mb-2 px-1 fw-bold">
                <span>{product.name.substring(0, 27)}...</span>
              </h5>
              <div className="px-1 fw-bold text-warning">
                Brand{" "}
                <span className="text-info-emphasis">{product.brand}</span>
              </div>
              <div className="details px-1">
                <div className="description mt-1">
                  <p className="mb-0 mt-1">
                    {product.detailedDescription.substring(0, 85)}...
                  </p>
                </div>
              </div>
              <div className="mt-1 details-bottom d-flex align-items-center justify-content-between px-1">
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
                <p className="fw-bold d-flex mb-0 px-1">
                  <span className="mx-1">&#x24;</span>
                  {product.priceUSD}
                  <span>/-</span>
                </p>
                <button
                  className="py-1 px-1 d-flex align-items-center gap-1"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                  <AiOutlineShoppingCart className="addToCartIcon" />
                </button>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductsSection;
