import { useDispatch, useSelector } from "react-redux";
import UserMenu from "../../components/UserMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaAddressCard, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { updateUserProfile } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // GET User Data
  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Dispatch Update Profile  action
      dispatch(updateUserProfile({ name, email, password, phone, address }))
        .then(() => {
          setIsLoading(false);
          setPassword("");
        })
        .catch((error) => {
          console.error("Profile update error:", error);
          toast.error("An error occurred during profile update.");
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred during profile update.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-3 mb-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="col-md-10 col-lg-8 col-xl-9 order-2 order-lg-1 mx-auto">
            <p className="text-center h1 mb-4 mx-1 mx-md-4 mt-4 fw-bold text-dark-emphasis">
              USER PROFILE
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
                    className="form-control fst-italic text-muted"
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
                    className="form-control fst-italic text-muted "
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    style={{ cursor: "not-allowed", letterSpacing: "1px" }}
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
                    className="form-control fst-italic text-muted "
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
                    className="form-control fst-italic text-muted "
                    placeholder="Enter Your Home Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="form3Example4c" className="form-label">
                  Password{" "}
                  <h6 className="text-warning">
                  passwords must be a minimum of 6 characters long
                  </h6>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center mb-3 mb-lg-4">
                <button
                  type="Submit"
                  className="btn btn-success btn-lg py-2 w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
