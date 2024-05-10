import "../styles/Pagination.css";
const Pagination = ({ currentPage, handlePrevPage, handleNextPage }) => {
  return (
    <div className="pagination w-100 h-25 position-sticky bottom-0 bg-white d-flex justify-content-center">
      <button
        disabled={currentPage === 1}
        onClick={handlePrevPage}
        className="px-3 py-2"
      >
        Previous
      </button>
      <div className="current-page">
        <span>{currentPage}</span>
      </div>
      <button onClick={handleNextPage} className="px-3  py-2">
        Next
      </button>
    </div>
  );
};

export default Pagination;
