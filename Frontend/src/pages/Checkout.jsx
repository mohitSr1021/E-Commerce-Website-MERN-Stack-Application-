import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LiaDollarSignSolid } from "react-icons/lia";
import { AiFillDelete } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import {
  removeFromCart,
  resetCart,
  incrementItemQuantity,
  decrementItemQuantity,
} from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

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

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data?.clientToken); // clientToken will get from api braintree
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payments
  const handlePayment = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post(
        "/api/v1/products/braintree/payment",
        {
          nonce,
          cartItems,
        },
        { headers: { Authorization: authToken } }
      );
      setLoading(false);
      dispatch(resetCart());
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Succesfully !!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container checkout-contianer position-relative">
      <div className="top w-75 mx-auto mb-2">
        <h2 className="text-center fw-bold text-dark-emphasis">Checkout</h2>
      </div>
      <div className="row flex-column-reverse align-items-center">
        <div className="col-md-7 mb-4">
          {cartItems.length > 0 ? (
            <div className="row">
              <div
                className="col-md-8 custom-shadow px-0 position-relative mb-4"
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
                          src={`/api/v1/products/get-product-photo/${item.id}`}
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
                      <h5 className=" text-muted">
                        {item.name.substring(0, 55)}
                      </h5>
                      <p className=" text-black-50 mb-2">
                        Brand: <span className="text-muted">{item.brand}</span>
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          Price:
                          <LiaDollarSignSolid className="icon-prop" />
                          <span className="text-muted text-decoration-line-through">
                            {item.totalPrice}
                          </span>
                          /-
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
              </div>
              <div className="col-md-4">
                <div className="custom-shadow p-3">
                  <h3 className="mb-4 text-capitalize text-muted border-bottom">
                    Price Details
                  </h3>
                  <div className="px-0 d-flex justify-content-between my-2">
                    <div>Price ({totalQuantity} items):</div>
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center">
                        <LiaDollarSignSolid className="icon-prop" />
                        {totalAmount}
                      </span>
                    </div>
                  </div>

                  <div className="px-0 d-flex justify-content-between my-2">
                    <div>Discount</div>
                    <div className="d-flex align-items-center">
                      <span className="text-success d-flex align-items-center">
                        -
                        <LiaDollarSignSolid className="icon-prop" />
                        {totalDiscount.toFixed(2)}
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
                      <div className="text-capitalize fw-bold">
                        total Payable
                      </div>
                      <div className="d-flex align-items-center">
                        <LiaDollarSignSolid className="icon-prop" />
                        <span className="fw-bold fs-6">
                          {parseFloat(TotalAmountPay).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="checkout-error-container d-flex align-items-center justify-content-center flex-column">
              <div className="checkout-error-box border">
                <div className="d-flex align-items-center justify-content-around flex-column">
                  <BiErrorCircle className="error-icon" />
                  <h4 className="my-2">Your Checkout has no items </h4>
                </div>
                <button
                  className="goBack-btn border px-3 py-2 custom-shadow"
                  onClick={() => navigate("/cart")}
                >
                  Go Back to Cart
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-5">
          <div className="d-flex align-items-center flex-column">
            {auth?.user?.address && (
              <div className="d-flex align-items-center justify-content-between col-sm-12  border-bottom mb-2">
                <div className="d-flex align-items-center px-1">
                  <h6 className="fw-bold d-flex align-items-center d-flex align-items-center mb-0">
                    Current Address:
                  </h6>
                  <span className="text-muted text-capitalize mx-2">
                    {auth?.user?.address}
                  </span>
                </div>
                <button
                  className="btn btn-outline-warning px-2 py-1 w-25 custom-shadow border-0"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            )}
            {auth?.user?.phone && (
              <div className="d-flex align-items-center justify-content-between col-sm-12 border-bottom mb-2">
                <div className="d-flex align-items-center px-1">
                  <h6 className="fw-bold d-flex align-items-center d-flex align-items-center mb-0">
                    Contact Details:
                  </h6>
                  <span className="text-muted text-capitalize mx-2">
                    {auth?.user?.phone}
                  </span>
                </div>
                <button
                  className="btn btn-outline-warning px-2 py-1 custom-shadow border-0"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Phone No
                </button>
              </div>
            )}
          </div>
          {!clientToken || !cartItems?.length ? (
            ""
          ) : (
            <div className="mb-0">
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                className="btn btn-primary mb-4"
                onClick={handlePayment}
                disabled={
                  loading ||
                  !instance ||
                  !auth?.user?.address ||
                  !auth?.user?.phone
                }
              >
                {loading ? "Processing...." : "Make Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
