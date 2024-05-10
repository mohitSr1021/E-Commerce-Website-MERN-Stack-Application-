import ClipLoader from "react-spinners/ClipLoader";

const CategoryForm = ({ handleSubmit, value, setValue,loading  }) => {
  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Enter New Category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? (
          <ClipLoader size={20} color={"#ffffff"} loading={loading} />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default CategoryForm;
