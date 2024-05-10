import UserMenu from "../../components/UserMenu";
import { useSelector } from "react-redux";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import userProfile from "../../assets/img/userProfile.png";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth.user);

  return (
    <div className="container mt-3 mb-3">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 mb-3 mb-md-0 text-center">
              <img
                src={userProfile}
                className="img-fluid rounded-circle"
                alt="Admin Avatar"
              />
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="p-4 rounded">
                <h2 className="fw-bold mb-3 text-capitalize d-flex flex-column align-items-center align-items-md-start">
                  {auth?.name}
                </h2>
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <p className="mb-1">
                    <FaEnvelope className="me-2" /> {auth?.email}
                  </p>
                  <p className="mb-1">
                    <FaPhone className="me-2" /> {auth?.phone}
                  </p>
                  <p className="mb-1">
                    <FaMapMarkerAlt className="me-2" /> {auth?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
