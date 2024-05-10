import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Bootstrap CDN link css
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";
// Toast Css
import "react-toastify/dist/ReactToastify.css";
import { StrictMode } from "react";
// Antd
import "antd/dist/reset.css";

// skreact-loading-skeletonelton
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
