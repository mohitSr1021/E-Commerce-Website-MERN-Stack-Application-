import { useSelector } from "react-redux";
import { Navigate, Routes } from "react-router-dom";

const Authorization = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Routes>{children}</Routes>;
};

export default Authorization;
