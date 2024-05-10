import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cart from "../assets/img/carticon.png";
import { FaDollarSign } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const totalDiscount = cartItems.reduce((acc, item) => {
    return (
      acc +
      (parseFloat(item.priceUSD) * item.quantity * item.discountPercentage) /
        100
    );
  }, 0);

  const TotalAmountPay = totalAmount - totalDiscount;

  // Function to handle incrementing quantity
  const handleIncrement = (item) => {
    dispatch(incrementItemQuantity(item.id));
  };

  // Function to handle decrementing quantity
  const handleDecrement = (item) => {
    dispatch(decrementItemQuantity(item.id));
  };

  return (
    <div className="container">
      <div className="top mb-1 row">
        <div className="mb-2 col-md-6 col-lg-7">
          You Have <span className="text-danger">{`${cartItems.length}`}</span>{" "}
          Product in Your Cart
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div className="row">
          <div
            className="col-md-8 custom-shadow px-0 position-relative"
            style={{
              minHeight: "fit-content",
              maxHeight: "67vh",
              overflowY: "auto",
            }}
          >
            {cartItems.map((item) => (
              <div className="card-item mt-2 mb-2 d-flex" key={item.id}>
                <div className="left d-flex flex-column align-items-center">
                  <div className="upper">
                    <img
                      src={`/api/v1/products/get-product-photo/${item?.id}`}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="bottom text-center w-100">
                    <button
                      className="px-3"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <input
                      className="input-common-props"
                      type="text"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="px-3"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-details px-4">
                  <h5
                    className=" text-muted text-decoration-underline"
                    onClick={() => navigate(`/product/${item.slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name?.substring(0, 55)}
                  </h5>
                  <p className=" text-black-50 mb-2">
                    Brand: <span className="text-muted">{item.brand}</span>
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      Price: <FaDollarSign className="icon-prop" />
                      <span className="text-muted text-decoration-line-through">
                        {item.priceUSD}
                      </span>
                    </div>
                    <div className="text-success">
                      {item.discountPercentage}% off
                    </div>
                  </div>
                  <button
                    className="remove-container"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <span className="mt-2">Remove</span>
                    <AiFillDelete className="remove-icon mt-2" />
                  </button>
                </div>
              </div>
            ))}
            <div
              className="w-100 py-2 px-3 text-end position-sticky bottom-0 bg-white"
              style={{
                boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
              }}
            >
              {!auth?.token ? (
                <h5
                  className="text-warning my-2 "
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart", // Here we set the state so that we can redirect the user to the cart after they log in.
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  Please login to checkout
                </h5>
              ) : (
                <button
                  className="bg-danger text-white w-25 px-3 py-3 text-uppercase border-0 custom-shadow"
                  onClick={() => navigate("/checkout")}
                >
                  Place order
                </button>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="custom-shadow p-3">
              <h3 className="mb-4 text-capitalize text-muted border-bottom">
                Price Details
              </h3>
              <div className="px-0 d-flex justify-content-between my-2">
                <div>Price ({totalQuantity} items):</div>
                <div className="d-flex align-items-center">
                  <span>
                    <FaDollarSign />
                    {parseFloat(totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="px-0 d-flex justify-content-between my-2">
                <div>Discount</div>
                <div className="d-flex align-items-center">
                  <span className="text-success">
                    -
                    <FaDollarSign />
                    {parseFloat(totalDiscount).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="px-0 d-flex justify-content-between my-2">
                <div>Delivery Charges</div>
                <div className="d-flex align-items-center">
                  <span className="text-success ">Free</span>
                </div>
              </div>

              <div className="border-top border-bottom mb-2">
                <div className="px-0 d-flex justify-content-between my-2">
                  <div className="text-capitalize fw-bold">total Amount</div>
                  <div className="d-flex align-items-center">
                    <FaDollarSign />
                    <span className="fw-bold">
                      {parseFloat(TotalAmountPay).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-banner">
          <img src={cart} alt="" />
          <p className="cart-desc">Cart is empty </p>
          <Link to="/products">
            <div className="browse-button border px-3 py-2">
              Continue buying the products.
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
