import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaList,
  FaClipboardList,
  FaUsers,
  FaHome,
} from "react-icons/fa";

const AdminMenu = () => {
  return (
    <>
      <div className="container pt-0 mt-4 mb-4">
        <div className="row">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">Admin Panel</h4>
                <ul className="list-group list-group-flush">
                  {/* end ==> The end prop changes the matching logic for the active and pending states to only match to the "end" of the NavLink's to path. If the URL is longer than to, it will no longer be considered active. */}
                  <NavLink
                    to="/dashboard/admin"
                    className="list-group-item d-flex align-items-center justify-content-start gap-2"
                    end
                  >
                    <FaHome className="mr-2 fa-icon-react" />
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/create-category"
                    className="list-group-item d-flex align-items-center justify-content-start gap-2"
                    end
                  >
                    <FaPlus className="mr-2 fa-icon-react" />
                    Create Category
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/create-product"
                    className="list-group-item d-flex align-items-center justify-content-start gap-2"
                    end
                  >
                    <FaPlus className="mr-2 fa-icon-react" />
                    Create Product
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/products"
                    className="list-group-item d-flex align-items-center justify-content-start gap-2"
                    end
                  >
                    <FaList className="mr-2 fa-icon-react" />
                    All Products
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/orders"
                    className="list-group-item d-flex align-items-center justify-content-start gap-2"
                    end
                  >
                    <FaClipboardList className="mr-2 fa-icon-react" />
                    All Orders
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin/users"
                    className="list-group-item d-flex align-items-center justify-content-start gap-2"
                    end
                  >
                    <FaUsers className="mr-2 fa-icon-react" />
                    Users
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
