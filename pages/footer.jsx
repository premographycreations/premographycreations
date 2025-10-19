import { color } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      
      <section className="contact">
        <h2>Contact Us</h2>
        <ul>
          <li>
            <strong>WhatsApp:</strong>{" "}
            <a href="https://wa.me/918697019885" target="_blank" rel="noopener noreferrer">
              +91 86970 19885
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+918697019885">+91 86970 19885</a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:premographycreations@gmail.com">
              premographycreations@gmail.com
            </a>

          </li>
          <li className="terms">
            <p >
              <Link to="/termsandconditions">Terms & Conditions</Link>
            </p>
          </li>
      
        </ul>
      </section>

      {/* Social Links */}
      <section className="social-links">
        <h3>Follow Us</h3>
        <div className="icons">
          <a
            href="https://www.instagram.com/premographycreations?fbclid=IwY2xjawMCWHBleHRuA2FlbQIxMABicmlkETFOVk1CMEZ1STdQa254WnRvAR7YpdMQserTZcLhyweOy-gB-pUid1Ak9Nd__AnZDhMbbiK2CRP2nRO7NqcclA_aem_OHz-e1OURtT0K3gDg_wBdg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/premographycreations?rdid=0fkmClAkj2Cnl4tg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AuZLwE6n7%2F#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/in/premsagar89/?fbclid=IwY2xjawMCWQJleHRuA2FlbQIxMABicmlkETFOVk1CMEZ1STdQa254WnRvAR5HAMVDXRFVHRBw_VGkwwZRVXIorA1EoLe5vHsQPzwbJX3F78YbN4damvwhTg_aem_yU9NmQluIGDwz7N2FlBBFg"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Copyright */}
      <div className="rights">
        <p>
          &copy; {new Date().getFullYear()} Premography Creations. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
