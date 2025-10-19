import React from "react";
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";

const Exhibition = () => {
  return (
    <>
      <Navbar />
      <main className="exhibition">
        <div className="content-wrapper">
          
          <div className="card">
            <img
              src="../assets/exhibition/Golden-Mountain2.jpg"
              alt="First Exhibition"
             
            />
            <p>
            “At the tranquil Deoriatal Lake, the majestic Mount Kanchenjunga reveals its golden glory during a breathtaking sunset. The still waters mirror the fiery hues of the sky, painting a picture of nature’s artistry. This phenomenon, often called the Golden Mountain, is a rare spectacle where the mountain glows with an ethereal charm, leaving every onlooker spellbound.”
            </p>
          </div>

          <div className="card">
            <img
              src="../assets/exhibition/Silhouette-Soul2.jpg"
              alt="Second Exhibition"
              
            />
            <p>
            “Silhouette-Soul is a striking play of light and shadows, where the human form emerges in powerful contrast against darkness. The upward gaze symbolizes liberation, strength, and transcendence, while the deep shadows create a sense of mystery and depth. This artwork captures not just the body, but the essence of emotion and inner spirit—making it a soulful expression of identity, resilience, and self-reflection.”
            </p>
          </div>
        </div>
      </main>
      <Footer />
<WhatsAppButton/>
    </>
  );
};

export default Exhibition;
