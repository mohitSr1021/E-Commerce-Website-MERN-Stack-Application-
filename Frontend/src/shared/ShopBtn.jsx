import { Link } from "react-router-dom";

export const ShopBtn = () => {
  return (
    <div className="shopBtn-div">
      <button className="ShopBtn">
        <Link
          to="/products"
          className="shopBtn-link text-decoration-none text-black"
        >
          Shop Now
          <span>&#128722;</span>
        </Link>
      </button>
    </div>
  );
};
