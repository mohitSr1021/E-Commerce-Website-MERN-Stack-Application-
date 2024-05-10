import "../styles/latestProducts.css";
import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import LatestProductLoadingSken from "../shared/LatestProductLoadingSken";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "/api/v1/products/new-product-featured"
        );
        if (data?.success) {
          setProducts(data?.featuredProducts);
          setIsLoading(false);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Check if the error is due to cancellation
          console.error("Error fetching latest products:", error);
          setIsLoading(false);
        }
      }
    };
    fetchLatestProducts();
  }, []);

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section className="latest-products container">
      <h1>Latest Products</h1>
      {isLoading ? (
        <LatestProductLoadingSken />
      ) : (
        <div className="products-container">
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard
                  name={product?.name}
                  image={`/api/v1/products/get-product-photo/${product?.id}`}
                  priceUSD={product?.priceUSD}
                  slug={product?.slug}
                />
              </div>
            ))}
          </Slider>
          <div className="custom-arrow prev" onClick={goToPrev}>
            <FaChevronLeft />
          </div>
          <div className="custom-arrow next" onClick={goToNext}>
            <FaChevronRight />
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestProducts;
