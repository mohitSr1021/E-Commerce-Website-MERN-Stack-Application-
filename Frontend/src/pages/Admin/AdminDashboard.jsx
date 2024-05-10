import { useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useSelector, useDispatch } from "react-redux";
import { FaEnvelope, FaPhone, FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { Modal, Button, Form, Input } from "antd";
import adminImage from "../../assets/img/admin-avtar.png";
import { updateAdminDetails } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    dispatch(updateAdminDetails(values))
      .unwrap()
      .then(() => {
        toast.success("Admin details updated successfully");
        setVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Admin details update error:", error);
        toast.error("Failed to update admin details");
      });
  };


  // name validation
  const validateName = (_, value) => {
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      return Promise.reject(
        "Name must start with a letter and contain only letters and spaces"
      );
    }
    return Promise.resolve();
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="fw-bold text-danger-emphasis mb-4">Admin Profile</h1>
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src={adminImage}
                className="img-fluid rounded-circle"
                alt="Admin Avatar"
              />
            </div>
            <div className="col-md-9">
              <h2 className="fw-bold mb-3">{auth?.name}</h2>
              <p className="mb-1">
                <FaEnvelope className="me-2" /> {auth?.email}
              </p>
              <p className="mb-1">
                <FaPhone className="me-2" /> {auth?.phone}
              </p>
              <p className="mb-1">
                <FaMapMarkerAlt className="me-2" /> {auth?.address}
              </p>

              <Button type="primary" onClick={showModal}>
                <FaEdit className="me-2" />
                Edit Profile
              </Button>
              <Modal
                title="Edit Admin Details"
                open={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <Form
                  form={form}
                  name="update_admin_form"
                  initialValues={{
                    name: auth?.name,
                    email: auth?.email,
                    phone: auth?.phone,
                    address: auth?.address,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                      {
                        min: 3,
                        message: "Name must be at least 3 characters!",
                      },
                      {
                        max: 50,
                        message: "Name must be at most 50 characters!",
                      },
                      { validator: validateName },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please input a valid email!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                      {
                        len: 10,
                        message: "Phone number must be 10 digits long!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      { required: true, message: "Please input your address!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
