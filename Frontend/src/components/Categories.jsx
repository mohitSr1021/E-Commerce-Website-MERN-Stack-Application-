import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Categories.css";
import ImageLoadingsken from "../shared/ImageLoadingsken";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source(); // Create a cancel token source

    const fetchFeaturedCategories = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "/api/v1/category/featured-categories",
          { cancelToken: source.token } // Pass cancel token to the request
        );
        if (data?.success) {
          setFeaturedCategories(data?.featuredCategories);
          setIsLoading(false);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Check if the error is due to cancellation
          console.log(error);
          setIsLoading(false);
        }
      }
    };

    fetchFeaturedCategories();

    return () => {
      source.cancel(); // Cancel the request when component is unmounted
    };
  }, []);

  return (
    <section className="Categories container">
      <h1>Featured Categories</h1>
      <div className="Categories-container">
        {isLoading ? (
          <ImageLoadingsken />
        ) : (
          featuredCategories?.map((category) => (
            <div
              className="CategoriesCard"
              key={category._id}
              onClick={() => navigate(`/category/${category.slug}`)}
            >
              <div className="categories-image-box">
                <img
                  src={`/api/v1/category/category-thumbnail/${category._id}`}
                  alt={category.name}
                />
              </div>
              <h4 className="CategoriesDescription">{category.name}</h4>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Categories;
