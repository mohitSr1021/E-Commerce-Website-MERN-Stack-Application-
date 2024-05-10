import "../styles/AllCategories.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category/");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {categories.map((c) => (
          <div className="col-md-6 col-lg-4 mb-4" key={c.id}>
            <div className="card ck-container">
              <div
                className="ck-image-container"
                style={{
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  transition: "transform 0.5s ease",
                }}
              >
                <img
                  src={`/api/v1/category/category-thumbnail/${c.id}`}
                  className="card-img-top"
                  alt={c.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{c.name}</h5>
                <Link
                  to={`/category/${c.slug}`}
                  className="btn btn-primary"
                >
                  View Category
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
