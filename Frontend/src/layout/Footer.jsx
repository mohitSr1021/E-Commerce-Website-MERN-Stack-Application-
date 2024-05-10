import "../styles/footer.css";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <div className="container">
      <footer className="pt-5 d-flex flex-column justify-content-between align-items-between">
        <div className="row d-flex justify-content-between align-items-between">
          <div className="col-6 col-md-2 mb-3">
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link p-0 text-body-secondary">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/products"
                  className="nav-link p-0 text-body-secondary"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/contact"
                  className="nav-link p-0 text-body-secondary"
                >
                  Contact us
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/Categories"
                  className="nav-link p-0 text-body-secondary"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 mb-3">
            <h5>About Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link p-0 text-body-secondary">
                  Our Story
                </Link>
              </li>
              <li className="nav-item mb-2">
                <HashLink
                  smooth
                  to="/#testimonials"
                  className="nav-link p-0 text-body-secondary"
                >
                  Testimonials
                </HashLink>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>
                Subscribe to receive exclusive offers, latest updates, and
                exciting news.
              </p>

              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="text"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="px-4 py-2 bg-dark text-white" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex bg-dark text-white  flex-column flex-sm-row  justi justify-content-center text-center  py-4 px-4 my-4 border-top">
          <p>
            Website crafted with ❤️ by Mohit Singh Rawat © 2024. All rights
            reserved.
          </p>
          <ul className="list-unstyled d-flex justify-content-center">
            <li className="ms-3">
              <h5>
                <Link
                  className="text-white"
                  to="https://my-portfolio-dev-neon.vercel.app/"
                  target="_Blank"
                >
                  Portfolio
                </Link>
              </h5>
            </li>
            <li className="ms-3">
              <Link to="https://github.com/MohitSr1021/" target="_Blank">
                <FaGithub className="text-white" />
              </Link>
            </li>
            <li className="ms-3">
              <Link to="https://instagram.com/_m._s._rawat_/">
                <FaInstagramSquare className="text-white" />
              </Link>
            </li>
            <li className="ms-3">
              <Link
                to="https://www.linkedin.com/in/mohit-singh-rawat-12680b21b/"
                target="_Blank"
              >
                <FaLinkedin className="text-white" />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
