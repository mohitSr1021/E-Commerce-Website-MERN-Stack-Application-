import { RiSecurePaymentLine } from "react-icons/ri";
import { RiRefund2Line } from "react-icons/ri";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineSupportAgent } from "react-icons/md";
import "../styles/Services.css"
const Services = () => {
  return (
    <section className="services container" id="services">
      <h1>Services</h1>
      <div className="services-container">
        <div className="ServicesCard">
          <LiaShippingFastSolid className="shipping" />
          <p className="ServicesDescription">Fast Shipping</p>
        </div>

        <div className="ServicesCard">
          <MdOutlineSupportAgent className="support" />
          <p className="ServicesDescription">24/7 Customer Support</p>
        </div>

        <div className="ServicesCard">
          <RiSecurePaymentLine className="secure" />
          <p className="ServicesDescription">Secure Payment</p>
        </div>
        <div className="ServicesCard">
          <RiRefund2Line className="refund" />
          <p className="ServicesDescription">Easy Returns & Refunds</p>
        </div>
        <div className="ServicesCard">
          <MdOutlineWorkspacePremium className="quality" />
          <p className="ServicesDescription">Product Quality Guarantee</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
