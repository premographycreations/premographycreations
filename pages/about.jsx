import React from "react";
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";
// import "../styles/about.scss"
const about = () => {
  return (
    <>
    <Navbar />
      <div className="about-page">
        
        <img src="../assets/logo.jpg" alt="" />
        <p>
          At Premography Creations, we believe photography is more than just
          capturing images—it’s about preserving emotions, telling untold
          stories, and freezing the most precious moments of life in their
          purest form. Our passion for creativity and dedication to perfection
          have made us a trusted name in both photography and videography. From
          the sparkle in a bride’s eyes to the serene beauty of nature, from
          joyous family celebrations to the subtle elegance of still life—we
          transform moments into timeless memories.
        </p>
      </div>
      <div className="vision">
        <img src="../assets/vision.jpg" alt="" />
        <div className="vision-container">
          <h1>Our Vision</h1>
          <p>
            We aim to create visuals that speak to the heart—authentic,
            artistic, and full of life. Our team blends technical expertise with
            an artistic eye to ensure every shot reflects the essence of the
            moment.
          </p>
        </div>
      </div>
      <div className="page">
        
        <div className="page-container">
          <h1>What We Do</h1>
          <p>
            We specialize in a wide range of photography and videography
            services, including: Wedding Photography & Videography Capturing
            love, laughter, and the magic of your big day. Pre-Wedding &
            Post-Wedding Shoots Creative storytelling for couples to cherish
            forever. Modeling & Fashion Photography Showcasing style,
            confidence, and personality. Maternity Photography Celebrating the
            journey of motherhood. Rice Ceremony & Traditional Events Honoring
            culture and heritage. Nature & Still Life Photography Preserving the
            beauty of the world around us.
          </p>
        </div>
        <img src="../assets/bg6.jpg" alt="" />
      </div>
      <div className="choose-us">
        <div className="choose-container">
          <h1>Why Choose Us</h1>
          <p>
            Experienced team of passionate photographers and videographers
            State-of-the-art equipment for stunning image quality Customized
            shoots tailored to your personality and preferences Commitment to
            delivering timeless memories At Premography Creations, life is our
            canvas, and your moments are the colors that make it beautiful.
            Because in the end, it’s not just a photograph—it's your story.
          </p>
        </div>

        <img src="../assets/about.jpg" alt="" />
      </div>
      <Footer />
<WhatsAppButton/>
    </>
  );
};

export default about;
