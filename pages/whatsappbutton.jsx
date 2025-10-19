import React from "react";
// import "boxicons/css/boxicons.min.css"; // import boxicons stylesheet


const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918697019885" // replace with your WhatsApp number
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="bx bxl-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;
