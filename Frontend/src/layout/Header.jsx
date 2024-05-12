import "../styles/header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import cart from "../assets/img/cart.png";
import login from "../assets/img/login2.png";
import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "../redux/slices/authSlice";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { searchProduct } from "../redux/slices/searchSlice";
import { fetchCategories } from "../redux/slices/categoriesSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [hasShadow, setHasShadow] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [searchBoxWidth, setSearchBoxWidth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownCategories, setShowDropdownCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [categories, setCategories] = useState([]);
  const { categories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowMobileNav(false);
    }
  };
  window.addEventListener("resize", handleResize);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearchBox = () => {
    setSearchBoxWidth(!searchBoxWidth);
  };
  const handleSearchClose = () => {
    setSearchBoxWidth(false);
  };

  const handleSearch = () => {
    dispatch(searchProduct(searchTerm));
    setSearchTerm("");
    navigate("/search");
  };

  // Get all categories
  // const getAllCategories = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/category/all-category/");
  //     setCategories(data?.category);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <header className={hasShadow ? "header shadow" : "header"}>
      {/* search box  */}
      <div className="search-cotainer">
        <div className={searchBoxWidth ? "search-width" : "d-none"}>
          <input
            className="search-input"
            type="search"
            placeholder="Search your product"
            id="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="icon-div">
            <CiSearch className="search-icon" onClick={handleSearch} />
          </button>
          <button className="icon-div" onClick={() => handleSearchClose()}>
            <IoCloseOutline className="close-icon" />
          </button>
        </div>
        <button className="search-div" onClick={() => handleSearchBox()}>
          <CiSearch className="search-icon" />
        </button>
      </div>

      <nav className="navbar container">
        <div className="nav-logo">
          <NavLink to="/" className="logo-link">
            <span>ecommerce.</span>
          </NavLink>
        </div>
        <div className={showMobileNav ? "mobile-nav-content" : "nav-content"}>
          <div
            className="hamburger-div"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <TfiClose className="icon menu-close" />
          </div>
          <ul className="p-0">
            {user?.role !== 1 ? (
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "black",
                    };
                  }}
                >
                  Home
                </NavLink>
              </li>
            ) : null}
            {user?.role !== 1 ? (
              <li>
                <NavLink
                  to="/products"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "black",
                    };
                  }}
                >
                  Products
                </NavLink>
              </li>
            ) : null}

            {user?.role !== 1 ? (
              <li>
                <div
                  className="categories-div d-flex align-items-center justify-content-center px-2 py-1"
                  onMouseEnter={() => setShowDropdownCategories(true)}
                  onMouseLeave={() => setShowDropdownCategories(false)}
                >
                  categories
                  {showDropdownCategories ? (
                    <IoIosArrowUp className="arrow-categories" />
                  ) : (
                    <IoIosArrowDown className="arrow-categories" />
                  )}
                  {showDropdownCategories && (
                    <div className="dropdown-menu">
                      <NavLink to="/categories" className="dropdown-item">
                        All Categories
                      </NavLink>
                      {isLoading ? (
                        <div className="text-center text-muted">Loading...</div>
                      ) : (
                        <div>
                          {categories &&
                            categories.map((c) => (
                              <NavLink
                                to={`/category/${c.slug}`}
                                className="dropdown-item"
                                key={c.id}
                              >
                                {c.name}
                              </NavLink>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ) : null}

            {user?.role !== 1 ? (
              <li>
                <NavLink
                  to="/about"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "black",
                    };
                  }}
                >
                  About
                </NavLink>
              </li>
            ) : null}

            {user?.role !== 1 ? (
              <li>
                <NavLink
                  to="/contact"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "red" : "black",
                    };
                  }}
                >
                  Contact
                </NavLink>
              </li>
            ) : null}
          </ul>

          <div className="cart-secion">
            {user?.role !== 1 ? (
              <Link to="/cart" className="cart">
                <img src={cart} alt="cart" />
                <span>{totalQuantity}</span>
              </Link>
            ) : null}

            {!user ? (
              <div className="auth">
                <Link
                  to="/login"
                  className={showMobileNav ? "mobile-login" : "login"}
                >
                  <img src={login} alt="loginIcon" />
                </Link>
                <Link to="/register" className="signup">
                  Signup
                </Link>
              </div>
            ) : (
              <div
                className="user-profile d-flex align-items-center px-2 py-1 mx-2"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <FaUserCircle className="user-profile-icon mx-1" />
                <span className="user-name text-uppercase text-warning fw-bold">
                  {user && user?.name.substring(0, 6)}
                </span>
                {showDropdown ? (
                  <IoIosArrowUp className="arrow mx-1" />
                ) : (
                  <IoIosArrowDown className="arrow mx-1" />
                )}
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item d-flex justify-content-center align-items-center gap-1">
                      <NavLink
                        to={`/dashboard/${user?.role === 1 ? "admin" : "user"}`}
                        className="nav-link"
                      >
                        <span>Dashboard</span>
                      </NavLink>
                    </div>
                    <div
                      className="dropdown-item d-flex justify-content-center align-items-center gap-1"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="logout-icon" />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="hamburger-icon"
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <CiMenuFries className="icon" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
