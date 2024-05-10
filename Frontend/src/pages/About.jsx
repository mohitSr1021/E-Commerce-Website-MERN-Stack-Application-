import { Link } from "react-router-dom";

const About = () => {
  return (
    <section
      className="about-section pt-5"
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Image"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: 10,
              }}
              className="mb-4"
            />
            <h2 className="mb-4 fw-bold text-dark-emphasis">
              Welcome to Our Online Store!
            </h2>
            <p className="fs-5">
              At Online E-commerce Site, we are committed to providing you with
              a seamless shopping experience.
            </p>
            <p className="fs-5">
              Our mission is to offer high-quality products at competitive
              prices, while demonstrating the power of modern web development
              technologies such as React.js, Node.js, Express.js, and MongoDB.
            </p>
            <p className="fs-5">
              This project is created to showcase our skills in web development.
              Connect with us on{" "}
              <a href="https://github.com/MohitSr1021">GitHub</a> for
              updates and more projects!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
