import { useState, useRef } from "react";
import contact_img from "../image/Contact-Us.png";

const Contact = () => {
  const [message, setmessage] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setmessage(true);
    formRef.current.reset();
  };

  return (
    <div className="contact-us">
      <div className="contact-us-img">
        <img src={contact_img} />
      </div>
      <form onSubmit={handleSubmit} className="contact" ref={formRef}>
        <h1>Contact Us</h1>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" placeholder="Enter your name" />
        </label>
        <label htmlFor="email">
          E-Mail:
          <input type="email" id="email" placeholder="Enter your email" />
        </label>
        <label htmlFor="textarea">
          Describe:
          <textarea
            id="textarea"
            placeholder="Write Something Here...."
            rows={7}
          ></textarea>
        </label>
        <div className="btn">
          <button type="submit">Submit</button>
        </div>
        {message && (
          <h2 className="response">
            Thanks for contacting Us, We will reply ASAP.
          </h2>
        )}
      </form>
    </div>
  );
};

export default Contact;
