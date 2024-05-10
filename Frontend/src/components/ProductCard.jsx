import { LiaDollarSignSolid } from "react-icons/lia";
import "../styles/productCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ name, image, priceUSD, slug }) => {
  const navigate = useNavigate();
  return (
    <div
      className="product-card-latest"
      onClick={() => navigate(`/product/${slug}`)}
    >
      <img src={image} alt="product-image" />
      <div className="card-desc d-flex flex-column justify-content-center align-items-center">
        <p className="fw-bold mb-2 px-1 d-flex align-items-center justify-content-center">
          <LiaDollarSignSolid className="icon-prop fs-5 fw-bolder" />
          <span>{priceUSD}</span>
          /-
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
