import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../../shared/Spinner";

export const Admin = () => {
  const [ok, setOk] = useState(false);
  const userInfo = useSelector((state) => state.auth);
  const authToken = userInfo?.token;

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get("/api/v1/auth/admin-auth", {
          headers: {
            Authorization: authToken || "",
          },
        });
        if (response.data?.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setOk(false);
      }
    };
    if (authToken) authCheck();
  }, [authToken]);

  return ok ? <Outlet /> : <Spinner path="" />;
};
