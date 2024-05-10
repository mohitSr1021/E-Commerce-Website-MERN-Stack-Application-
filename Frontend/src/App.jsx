import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

// react toastify
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/user/Dashboard.jsx";
import { PrivateRoute } from "./components/Routes/Private.jsx";
import { Admin as AdminRoute } from "./components/Routes/Admin.jsx";

// react hot toast
import { Toaster } from "react-hot-toast";

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import AllProducts from "./pages/Admin/Products.jsx";
import Users from "./pages/Admin/Users.jsx";
import Orders from "./pages/user/Orders.jsx";
import Profile from "./pages/user/Profile.jsx";
import Search from "./pages/Search.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryProduct from "./pages/CategoryProduct.jsx";
import Checkout from "./pages/Checkout.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Authorization from "./layout/Authorization.jsx";
import PrivateCheckoutRoute from "./pages/Auth/PrivateCheckoutRoute.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<NotFound />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route extact path="admin/products" element={<AllProducts />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/login/*"
          element={
            <Authorization>
              <Route path="/" element={<Login />} />
            </Authorization>
          }
        />

        <Route
          path="/register/*"
          element={
            <Authorization>
              <Route path="/" element={<Register />} />
            </Authorization>
          }
        />

        <Route
          path="/reset-Password/*"
          element={
            <Authorization>
              <Route path="/" element={<ResetPassword />} />
            </Authorization>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout/*"
          element={
            <PrivateCheckoutRoute>
              <Route path="/" element={<Checkout />} />
            </PrivateCheckoutRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
