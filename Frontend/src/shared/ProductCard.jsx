import { RiStarSFill } from "react-icons/ri";
const ProductCard = ({
  name,
  description,
  thumbnail,
  priceUSD,
  rating,
  discountPercentage,
}) => {
  return (
    <div className="admin-product-card">
      <div className="px-1 update-div position-absolute top-0">
        Update Details
      </div>
      <div className="image-container">
        <img src={thumbnail} alt="product-image" />
      </div>
      <h6 className="mt-3 mb-1 px-1 fw-bold">{name}</h6>
      <div className="details px-1">
        <div className="description">
          <p className="mb-0">{description}</p>
        </div>
      </div>
      <div className="details-bottom d-flex align-items-center justify-content-between px-1">
        <div className="rating-container my-1 d-flex align-items-center">
          <span>{rating}</span>
          <RiStarSFill className="rating" />
        </div>
        <div className="mx-3 text-success">
          <span>{discountPercentage}% off</span>
        </div>
      </div>
      <p className="fw-bold d-flex mb-auto py-1 px-1">
        <span>&#x24;</span>
        {priceUSD}
        <span>/-</span>
      </p>
      <div className="addToCart py-1">
        <p className="fw-bold d-flex mb-0 px-1">
          <span>&#8377;</span>
          {priceUSD}
          <span>/-</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
