import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/auth/users/all-users", {
          headers: {
            Authorization: token,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-2 mb-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-lg-9 col-md-12">
          <h2 className="text-center fw-bold text-dark-emphasis mb-4">
            All Users
          </h2>
          <div className="overflow-scroll users-data-container">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col" style={{ width: "5%" }}>
                    S.No
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Email
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Phone
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Password
                  </th>
                  <th scope="col" style={{ width: "5%" }}>
                    Role
                  </th>
                  <th scope="col" style={{ width: "40%" }}>
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="text-center">
                    <td style={{ width: "5%" }}>{index + 1}</td>
                    <td
                      style={{
                        width: "15%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      style={{
                        width: "10%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.phone}
                    </td>
                    <td
                      style={{
                        width: "10%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.password}
                    </td>
                    <td
                      style={{
                        width: "5%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.role === 1 ? "Admin" : "User"}
                    </td>
                    <td
                      style={{
                        width: "40%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
