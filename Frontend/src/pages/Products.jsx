import "../styles/poductPage.css";
import "../styles/prodcutsSideBar.css";
import { Link } from "react-router-dom";
import ProductsSection from "../components/ProductsSection";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../redux/slices/categoriesSlice";
import { fetchProducts, updateProducts } from "../redux/slices/productSlice";
import axios from "axios";

const Products = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const products = useSelector((state) => state.products.data.products);

  // Filter Product
  const handleFilter = (value, cid) => {
    let allCheckedCategories = [...checked];
    if (value) {
      allCheckedCategories.push(cid);
    } else {
      allCheckedCategories = allCheckedCategories.filter((c) => c !== cid);
    }
    setChecked(allCheckedCategories);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (checked.length) {
      filterProduct();
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, checked]);

  // POST Filtered Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters/", {
        checked,
      });
      dispatch(updateProducts(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="product-container container px-0 py-0">
      <nav className="breadcrumb-nav" aria-label="breadcrumb">
        <ol className="breadcrumb my-auto">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Products
          </li>
        </ol>
      </nav>
      <div className="height-full row mx-0">
        <div className="col-lg-2 col-sm-12 col-md-12 pt-1">
          <section
            className="prodcutsSideBar w-100 text-center text-white py-lg-3
           mb-4"
          >
            <h4 className="py-3 mb-0 fw-bolder">Categories</h4>
            <ul className="list-unstyled px-2 mb-3">
              {isLoading ? (
                <div className="loader-container">
                  <ClipLoader className="loader" />
                </div>
              ) : (
                categories.map((category) => (
                  <li key={category._id}>
                    <label className="d-flex align-items-center justify-content-center p-1">
                      <div className="w-10 px-1 py-1 d-flex align-items-center justify-content-center">
                        <input
                          type="checkbox"
                          name={category.name}
                          onChange={(e) => {
                            handleFilter(e.target.checked, category._id);
                          }}
                        />
                        <span className="checkmark m-0"></span>
                      </div>
                      <div className="w-100 d-flex p-1">{category.name}</div>
                    </label>
                  </li>
                ))
              )}
            </ul>
            <div>
              <button
                className="reset-filters text-uppercase px-4 py-1 bg-warning border-0"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </section>
        </div>
        <div className="col-lg-10  col-sm-12 col-md-12">
          <ProductsSection checked={checked} products={products} />
        </div>
      </div>
    </section>
  );
};

export default Products;
