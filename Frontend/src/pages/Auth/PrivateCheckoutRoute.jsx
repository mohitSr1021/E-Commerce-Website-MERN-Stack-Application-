import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";

const PrivateCheckoutRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!(auth?.user && auth?.token)) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return auth?.user && auth?.token ? (
    <Routes>
      <Route {...rest}>{children}</Route>
    </Routes>
  ) : null;
};

export default PrivateCheckoutRoute;
