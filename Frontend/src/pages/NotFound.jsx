import PageNotFound from "../assets/img/PageNotFound.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className=" notfound container-fluid d-flex justify-content-center align-items-center flex-column gap-10 text-center">
      <img src={PageNotFound} alt="NotFound" />
      <div className="w-50">
        <button className="px-3 py-2 border-0 rounded" id="GoBack">
          <Link to="/">Go Back</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
