import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaClipboardQuestion } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// react hot Toast
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  // Submit Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      answer.trim() === ""
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    try {
      const response = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (response && response.data.success) {
        toast.success(response.data.msg);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        navigate("/login");
      } else return toast.error(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong :(");
    }
  };

  return (
    <section>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black border-0">
              <div className="card-body p-md-3">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <p className="text-center mb-4">
                      Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="form3Example1c" className="form-label">
                          Your Name
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="form3Example3c" className="form-label">
                          Your Email
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <MdEmail />
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="form3Example4c" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <RiLockPasswordFill />
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Your Password"
                            value={password}
                            autoComplete=""
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="form3Example4cd" className="form-label">
                          Phone
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaPhoneAlt />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="form3Example4c" className="form-label">
                          Address
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaAddressCard />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Home Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="form3Example4c"
                          className="form-label fw-bold text-info"
                        >
                          Question !!
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaClipboardQuestion />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="What is Your Friend Name 0_0 ?"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mb-3 mb-lg-4">
                        <button
                          type="Submit"
                          className="btn btn-success btn-lg py-2 w-100"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 overflow-hidden register-container ">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid w-100 h-100 register-banner"
                      alt="Sample"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
