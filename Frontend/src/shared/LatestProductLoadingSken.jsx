import "../styles/LatestProductLoadingSken.css";

const LatestProductLoadingSken = () => {
  return (
    <div className="container Latest-product-sken-container">
      {[1, 2, 3].map((index) => (
        <div className="Latest-product-sken border" key={index}>
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
        </div>
      ))}
    </div>
  );
};

export default LatestProductLoadingSken;
