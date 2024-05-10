import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SpinnerAdmin from "../../shared/SpinnerAdmin";

export const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const userInfo = useSelector((state) => state.auth);
  const authToken = userInfo?.token;
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await axios.get("/api/v1/auth/user-auth", {
          headers: {
            Authorization: token,
          },
        });
        if (data?.ok) {
          setOk(true);
        } else {
          if (location.pathname === "/dashboard/user") {
            navigate("/dashboard/admin", {
              state: { message: "You can't access the Dashboard" },
            });
          } else {
            setOk(false);
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setOk(false);
      }
    };
    if (authToken) {
      authCheck();
    }
  }, [authToken, location.pathname, navigate]);

  return ok ? (
    <Outlet />
  ) : (
    <SpinnerAdmin
      message="You can't access the user dashboard"
      redirectTo="/dashboard/admin"
    />
  );
};
