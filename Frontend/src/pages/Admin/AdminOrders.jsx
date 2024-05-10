import { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { useSelector } from "react-redux";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const auth = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    { value: "Not Process", color: "gray" },
    { value: "Processing", color: "orange" },
    { value: "Shipped", color: "blue" },
    { value: "Delivered", color: "green" },
    { value: "Cancelled", color: "red" },
  ]);

  const getAllOrders = async () => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.get("/api/v1/auth/all-orders", {
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
      getAllOrders();
    }
  }, [auth?.token]);

  const handleStatusChange = async (orderID, value) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      await axios.put(
        `/api/v1/auth/order-status/${orderID}`,
        { status: value },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center fw-bold text-dark-emphasis">All Orders</h2>
          <div className="table-responsive">
            <table className="table table-striped">
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
                      <Select
                        key={index}
                        onChange={(value) =>
                          handleStatusChange(order._id, value)
                        }
                        defaultValue={order?.status}
                        variant="borderless"
                      >
                        {status.map((statusValue, index) => (
                          <Option
                            key={index}
                            value={statusValue.value}
                            style={{ color: statusValue.color }}
                          >
                            {statusValue.value}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{order?.buyer?.name}</td>
                    <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                    <td>
                      {order?.payment?.success ? (
                        <span
                          className={
                            "rounded px-2 py-1 " +
                            (order?.payment?.success
                              ? "text-white bg-success"
                              : "text-white bg-danger")
                          }
                        >
                          {order?.payment?.success ? "Success" : "Failed"}
                        </span>
                      ) : (
                        ""
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
                            <div>${product.priceUSD}/-</div>
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

export default AdminOrders;
