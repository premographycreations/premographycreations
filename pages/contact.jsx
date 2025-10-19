import React from "react";
import Navbar from "./nav.jsx";

const contact = () => {
  return (
    <>
      <Navbar />

      <div className="contact-page">
        {/* Title */}
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Reach out using the details below.</p>
        </header>

        {/* Contact Info */}
        <section className="contact-info">
          <div className="info-block">
            <h3>Phone</h3>
            <a href="tel:+918697019885">+91 86970 19885</a>
          </div>

          {/* <div className="info-block">
          <h3>WhatsApp</h3>
          <a href="https://wa.me/918697019885" target="_blank" rel="noopener noreferrer">
            +91 86970 19885
          </a>
        </div> */}

          <div className="info-block">
            <h3>Email</h3>
            <a href="mailto:premographycreations@gmail.com">
              premographycreations@gmail.com
            </a>
          </div>
        </section>

        {/* Social Links */}
        <section className="social-links">
          <h3>Follow Us</h3>
          <div className="icons">
            <a
              href="https://www.instagram.com/premographycreations"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Instagram Icon */}
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a
              href="https://www.facebook.com/premographycreations"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Facebook Icon */}
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a
              href="https://wa.me/918697019885"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* whatsapp Icon */}
              <i className="fab fa-whatsapp fa-2x"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/premsagar89"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* LinkedIn Icon */}
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </section>

        {/* Google Map */}
        <section className="map-section">
          <h3>Our Location</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.544475850265!2d88.4540636!3d22.6707665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f9b1401b0b3%3A0x38fc9e512b5678db!2sPremography%20Creations!5e0!3m2!1sen!2sin!4v1756727039596!5m2!1sen!2sin"
              width="1800"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
         
        </section>
      </div>
    </>
  );
};

export default contact;
