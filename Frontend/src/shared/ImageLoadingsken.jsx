import "../styles/imageloadingSken.css";

const ImageLoadingSkeleton = () => {
  return (
    <div className="container Categories-sken-container">
      {[1, 2, 3, 4, 5].map((index) => (
        <div className="CategoriesCard-sken border" key={index}>
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
        </div>
      ))}
    </div>
  );
};

export default ImageLoadingSkeleton;
