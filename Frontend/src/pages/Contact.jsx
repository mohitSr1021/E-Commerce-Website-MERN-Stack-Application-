import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contact.css";
import toast from "react-hot-toast";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_dtmuugb", "template_eya4btk", form.current, {
        publicKey: "DrAlmxZy6if1iMRAc",
      })
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="container form-container">
      <form ref={form} onSubmit={sendEmail} className="_form">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="user_name"
          required
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email Address"
          name="user_email"
          required
        />
        <label>Message</label>
        <textarea name="message" placeholder="Enter Your Message" required />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Contact;
