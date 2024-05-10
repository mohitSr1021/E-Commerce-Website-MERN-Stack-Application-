import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../shared/ProductCard";
import AdminMenu from "../../components/AdminMenu";
import "../../styles/admin.css";
import Pagination from "../../shared/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import ClipLoader from "react-spinners/ClipLoader";
const Products = () => {
  const dispatch = useDispatch();
  const { isLoading, currentPage, totalPages, products } = useSelector(
    (state) => state.products.data
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage }));
  }, [currentPage, dispatch]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchProducts({ page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchProducts({ page: currentPage + 1 }));
    }
  };

  return (
    <div className="container mt-2">
      <div className="row mb-5">
        <div className="col-md-3 mb-4 col-lg-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 col-lg-9">
          <h3 className="text-center mt-3 fs-2 fw-bold text-dark-emphasis">
            All Products List
          </h3>
          <div className="px-3">
            <h6 className="text-danger">
              Note: Images may take a moment to load.
            </h6>
          </div>
          <div className="admin-products-div d-flex justify-content-center flex-wrap">
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader className="loader" />
              </div>
            ) : (
              <>
                {products?.map((p) => (
                  <div key={p.id}>
                    <Link
                      to={`/dashboard/admin/products/${p.slug}`}
                      className="single-product-link"
                    >
                      <ProductCard
                        description={p.detailedDescription.substring(0, 85)}
                        discountPercentage={p.discountPercentage}
                        thumbnail={`/api/v1/products/get-product-photo/${p.id}`}
                        priceUSD={p.priceUSD}
                        rating={p.rating}
                        name={p.name.substring(0, 55)}
                        // productModelLength={p.productModelLength} // Add productModelLength to ProductCard props
                      />
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
