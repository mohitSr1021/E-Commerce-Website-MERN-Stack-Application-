import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SpinnerAdmin = ({ message, redirectTo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(redirectTo || "/login", { state: location.pathname });
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timeout);
  }, [navigate, location.pathname, redirectTo]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center text-danger">{message}</h1>
    </div>
  );
};

export default SpinnerAdmin;
