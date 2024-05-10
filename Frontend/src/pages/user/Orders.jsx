import axios from "axios";
import UserMenu from "../../components/UserMenu";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdLocalShipping } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";

const Orders = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.get("/api/v1/auth/orders", {
        headers: {
          Authorization: authToken,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "text-secondary";
      case "Processing":
        return "text-primary";
      case "Shipped":
        return "text-info";
      case "Delivered":
        return "text-success";
      case "Cancelled":
        return "text-danger";
      default:
        return "text-secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Not Process":
        return <AiOutlineClockCircle className="status-icon" />;
      case "Processing":
        return <AiOutlineClockCircle className="status-icon" />;
      case "Shipped":
        return <MdLocalShipping className="status-icon" />;
      case "Delivered":
        return <FaCheck className="status-icon" />;
      case "Cancelled":
        return <FaTimes className="status-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="container-md mt-3 mb-3">
      <div className="row">
        <div className="col-lg-3 col-md-12">
          <UserMenu />
        </div>
        <div className="col-lg-9 col-md-12">
          <h2 className="text-center fw-bold text-dark-emphasis mb-4">
            All Orders
          </h2>
          <div className="overflow-auto">
            <table
              className="table table-striped"
              style={{ tableLayout: "auto" }}
            >
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">S.No</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Product Details</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <div
                        className={`w-100 rounded d-flex align-items-center justify-content-center gap-1 px-2 py-1 ${getStatusColor(
                          order?.status
                        )}`}
                      >
                        {getStatusIcon(order?.status)} {order?.status}
                      </div>
                    </td>
                    <td>{order?.buyer?.name}</td>
                    <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                    <td>
                      {order?.payment?.success ? (
                        <span className="rounded px-2 py-1 text-white bg-success">
                          Success
                        </span>
                      ) : (
                        <span className="rounded px-2 py-1 text-white bg-danger">
                          Failed
                        </span>
                      )}
                    </td>
                    <td>{order?.products?.length}</td>
                    <td>
                      <div className="d-flex flex-column align-items-center">
                        {order?.products?.map((product, i) => (
                          <div key={i} className="mb-2">
                            <img
                              src={`/api/v1/products/get-product-photo/${product.id}`}
                              alt={product.name}
                              width="50"
                              height="40"
                              style={{ objectFit: "contain" }}
                              className="img-fluid"
                            />
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "45ch",
                              }}
                            >
                              {product?.name}
                            </div>
                            <div className="fw-bold fs-5 px-4">
                              <p className="text-muted mb-0 mx-0 d-inline-flex">
                                Actual Price:
                              </p>
                              <span className="bg-info px-1 rounded">
                                ${product.priceUSD}/-
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
