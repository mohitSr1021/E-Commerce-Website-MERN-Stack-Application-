import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaClipboardList } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="container pt-0 mt-4 mb-4">
      <div className="row">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">User Panel</h4>
              <ul className="list-group list-group-flush">
                <NavLink
                  to="/dashboard/user"
                  className="list-group-item d-flex align-items-center justify-content-start gap-2"
                  end
                >
                  <FaHome className="mr-2 fa-icon-react" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/user/profile"
                  className="list-group-item d-flex align-items-center justify-content-start gap-2"
                  end
                >
                  <FaUser className="mr-2 fa-icon-react" />
                  Profile
                </NavLink>
                <NavLink
                  to="/dashboard/user/orders"
                  className="list-group-item d-flex align-items-center justify-content-start gap-2"
                  end
                >
                  <FaClipboardList className="mr-2 fa-icon-react" />
                  Orders
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
