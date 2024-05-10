import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // reset handler
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !newPassword || !answer) {
        setLoading(false);
        return toast.error("Please fill out all required fields.");
      }
      if (newPassword.length < 6) {
        setLoading(false);
        return toast.error("Password must be at least 6 characters long.");
      }
      const { data } = await axios.post("/api/v1/auth/reset-password", {
        email,
        newPassword,
        answer,
      });
      if (data?.success) {
        setLoading(false);
        toast.success(data.msg);
        navigate("/login");
        setEmail("");
        setNewPassword("");
        setAnswer("");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something Went Wrong !");
      }
      setEmail("");
      setNewPassword("");
      setAnswer("");
    }
  };

  return (
    <section className="h-100 my-5">
      <div className="container py-5 h-100">
        <div className="row d-lg-flex justify-content-center align-items-center h-100">
          <div className="col col-md-7 col-lg-6 col-sm-6 px-5">
            {/* Reset Password Form */}
            <div className="card w-100 border-0">
              <div className="card-body p-4 p-lg-6 p-sm-0 p-3 text-black text-center">
                <form className="w-100" onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <i
                      className="fas fa-lock fa-2x me-3"
                      style={{ color: "#ff6219" }}
                    ></i>
                    <span className="h1 fw-bold mb-0">Reset Password</span>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg text-center"
                      placeholder="Enter Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg text-center"
                      placeholder="Enter Your Friend Name ?"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg text-center"
                      placeholder="Enter Your New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-dark btn-lg btn-block w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Updating Password..." : "Password Updated !"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
