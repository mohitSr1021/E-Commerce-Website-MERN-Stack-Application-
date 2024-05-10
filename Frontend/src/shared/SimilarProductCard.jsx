import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SimilarProductCard = ({ product, handleAddToCart }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // logic of add to cart and go to cart
  const renderAddToCartButton = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex === -1) {
      return (
        <button
          className="add-cart-button"
          onClick={() => handleAddToCart(product)}
          style={{ whiteSpace: "nowrap" }}
        >
          <span className="mx-1">Add to Cart</span>
          <AiOutlineShoppingCart className="addToCartIcon" />
        </button>
      );
    } else {
      return (
        <button
          className="add-cart-button px-4"
          onClick={() => navigate("/cart")}
        >
          <span className="mx-2">Go to Cart</span>
          <BsCartFill className="addToCartIcon" />
        </button>
      );
    }
  };

  return (
    <div className="similar-product d-flex my-3">
      <div className="left col-4">
        <img
          src={`/api/v1/products/get-product-photo/${product?.id}`}
          alt={handleAddToCart?.id}
        />
      </div>
      <div className="right position-relative col-8 px-2">
        <div className="top d-flex justify-content-between align-items-center flex-column">
          <h6 className="mt-3 mb-0 fw-bold" style={{ whiteSpace: "nowrap" }}>
            {product?.name.substring(0, 25)}
          </h6>
          <div className="fw-bold text-warning mt-1">
            Brand{" "}
            <span className="text-info-emphasis">
              {product?.brand.substring(0, 15)}
            </span>
          </div>
        </div>
        <div className="description mt-1">
          <p className="mb-0 mt-1">
            {product?.detailedDescription.substring(0, 50)}...
          </p>
        </div>
        <div className="details-bottom d-flex align-items-center justify-content-between">
          <div className="rating-container my-1 d-flex align-items-center">
            <span>{product?.rating}</span>
            <RiStarSFill className="rating" />
          </div>
          <div className="mx-3 text-success">
            {product?.discountPercentage} <span>% off</span>
          </div>
          <div className="addToCart px-4">{renderAddToCartButton(product)}</div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
