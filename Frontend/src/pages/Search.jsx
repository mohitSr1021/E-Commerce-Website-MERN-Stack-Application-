import "../styles/search.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaDollarSignSolid } from "react-icons/lia";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addToCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { setSearchResults } from "../redux/slices/searchSlice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchResults) {
      dispatch(setSearchResults(searchResults));
    }
  }, [dispatch, searchResults]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Item Added To Cart");
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader className="loader" />
      </div>
    );
  }

  if (!searchResults.results || searchResults.results.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="container mt-4 d-flex flex-wrap justify-content-center">
      {searchResults.results.map((product) => (
        <div
          className="search-product-card col-lg-4 col-md-6 mb-4"
          key={product.id}
        >
          <button
            className="px-1 search-view-more position-absolute top-0"
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            View More Details
          </button>
          <div className="image-container">
            <img
              src={`/api/v1/products/get-product-photo/${product.id}`}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <h5 className="mt-3 mb-1 px-1 fw-bold">
            {product.name.substring(0, 45)}
          </h5>
          <div className="px-1 fw-bold text-warning">
            Brand <span className="text-info-emphasis">{product.brand}</span>
          </div>
          <div className="details px-1 mt-1">
            <div className="description">
              <p className="mb-0">
                {product.detailedDescription.substring(0, 90)}...
              </p>
            </div>
          </div>
          <div className="details-bottom d-flex align-items-center justify-content-between px-1 mb-0">
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
              className="btn btn-primary"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart <AiOutlineShoppingCart className="addToCartIcon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
