import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer.jsx";
import Navbar from "./nav.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";

import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import bg5 from "../assets/bg5.jpg";
// import bg6 from '../assets/bg6.jpg';
// import bg7 from '../assets/bg7.jpg';
import bg8 from "../assets/bg8.jpg";
import bg9 from "../assets/bg9.jpg";

const images = [bg1, bg2, bg3, bg4, bg5, bg8, bg9];
const home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="home"
        style={{
          backgroundImage: `url(${images[index]})`,
        }}
      >
        <Navbar />

        <div className="overlay">
          <h1>Welcome to <br />Premography Creations</h1>

          <p>
            Premography Creations is a professional photography and videography studio dedicated to capturing life’s most precious moments with creativity and passion. From weddings, pre-weddings, and maternity shoots to modeling, nature, and cultural events—we turn every click into a timeless story.
          </p>

        </div>
      </div>
      <div className="communicate">
            <Link to="https://www.facebook.com/premographycreations?rdid=0fkmClAkj2Cnl4tg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AuZLwE6n7%2F#" style={{ "--i": 6 }}>
              <i className="bx bxl-facebook-circle"></i>
            </Link>
            <Link to="https://www.instagram.com/premographycreations?fbclid=IwY2xjawMCWHBleHRuA2FlbQIxMABicmlkETFOVk1CMEZ1STdQa254WnRvAR7YpdMQserTZcLhyweOy-gB-pUid1Ak9Nd__AnZDhMbbiK2CRP2nRO7NqcclA_aem_OHz-e1OURtT0K3gDg_wBdg" style={{ "--i": 7 }}>
              <i className="bx bxl-instagram"></i>
            </Link>
            <Link to="https://www.linkedin.com/in/premsagar89/?fbclid=IwY2xjawMCWQJleHRuA2FlbQIxMABicmlkETFOVk1CMEZ1STdQa254WnRvAR5HAMVDXRFVHRBw_VGkwwZRVXIorA1EoLe5vHsQPzwbJX3F78YbN4damvwhTg_aem_yU9NmQluIGDwz7N2FlBBFg" style={{ "--i": 8 }}>
              <i className="bx bxl-telegram"></i>
            </Link>
            <Link to="https://premographycreations.co.in/?fbclid=IwY2xjawMCWQNleHRuA2FlbQIxMABicmlkETFOVk1CMEZ1STdQa254WnRvAR64S_bUBuVZbJRvyPHdZuDrjtUy4FgxW7rWUHgzuwaYLoPRcn3Z6_UVOGp9rA_aem_lY3JjIFW2WrJ5yfDcjwOnw" style={{ "--i": 9 }}>
              <i className="bx bxl-linkedin"></i>
            </Link>
          </div>
<div className="about">
  <img src="../assets/logo.jpg" alt="logo" />
  <p>
<b>EVERY CLICK TELLS A STORY
.....Enjoy Each Moments of The Life.....
Life itself is a Great Teacher, Never Stop Learning !!!</b>

  </p>

</div>
<Footer />
<WhatsAppButton/>
    </>
  );
};

export default home;
