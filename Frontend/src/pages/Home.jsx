import { useState, useEffect } from "react";
import "../styles/homePage.css";
import LatestProducts from "../components/LatestProducts";
import Testimonials from "../components/Testimonials";
import Services from "../components/Services";
import Categories from "../components/Categories";
import { ShopBtn } from "../shared/ShopBtn";
import Banner from "../shared/Banner";
import { Alert, Button } from "react-bootstrap";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const Home = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
  };

  useEffect(() => {
    if (showDisclaimer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showDisclaimer]);

  return (
    <>
      {showDisclaimer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              padding: "20px",
            }}
          >
            <Alert
              className="disclaimer-alert"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #dc3545",
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <FaExclamationTriangle style={{ marginRight: "10px" }} />
                <h3 className="m-0">Disclaimer</h3>
              </div>
              <p style={{ margin: "15px 0" }}>
                The prices and images displayed here are for showcase purposes
                only and may not accurately represent actual products.
              </p>
              <h5 style={{ margin: "20px 0" }}>
                Note: Try to view this project on a laptop for a better
                experience.
              </h5>
              <Button
                variant="outline-danger"
                style={{ marginTop: "20px" }}
                onClick={handleCloseDisclaimer}
              >
                <FaTimes style={{ marginRight: "5px" }} /> Close
              </Button>
            </Alert>
          </div>
        </div>
      )}
      <div className="home container">
        <Banner />
        <ShopBtn />
        <Categories />
        <LatestProducts />
        <Services />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
