import React from "react";
import Navbar from "./nav.jsx";
import logo from "../assets/logo.jpg";
import WhatsAppButton from "./whatsappbutton.jsx";
import Footer from "./footer.jsx";

const Packages = () => {
  const packagesData = [
    {
      img: "../assets/engage1.jpg",
      title: "Premium Engagement Package",
      price: "₹35,000.00",
      subtitle: "Engagement Ceremony Coverage",
      deliverables: [
        "Engagement Album with Sparkle / Velvet Cover",
        "One Leather Bag",
        "One Transparent Page",
        "One Engagement Highlight Video",
        "One Cinematic Teaser",
      ],
      free: [
        "Three Engagement Reels",
        "One Decorative Couple Portrait Print",
      ],
    },
    {
      img: "../assets/prewedding/pre8.jpg",
      title: "Premium Pre-Wedding Package",
      price: "₹45,000.00",
      subtitle: "Pre-Wedding Outdoor / Destination Shoot",
      deliverables: [
        "One Pre-Wedding Teaser",
        "Five Cinematic Pre-Wedding Reels",
      ],
      free: [
        "One 64 GB SanDisk Pen Drive",
        "One Enlarged Couple Wall Frame",
        "One Customized Couple Mug Set",
      ],
    },
    {
      img: "../assets/wedding/groom.png",
      title: "Premium Wedding Package(Groom)",
      price: "₹70,000.00",
      subtitle: "Haldi - Wedding - Reception",
      deliverables: [
        "Wedding Album with Sparkle / 3D / Velvet / Metallic Cover",
        "One Leather Box",
        "One Leather Bag",
        "One Mini Calendar (13 Pages)",
        "One Mini Album Book",
        "One Transparent Page",
        "One Pen Drive Box",
        "One Wedding Cinematic Video",
        "One Wedding Teaser",
      ],
      free: [
        "Five Wedding Reels",
        "One 64 GB SanDisk Pen Drive",
        "One Table Photo Frame",
        "One BHAGAVAD GITA",
      ],
    },
    {
      img: "../assets/wedding/bride.png",
      title: "Premium Wedding Package(Bride)",
      price: "₹65,000.00",
      subtitle: "Haldi - Wedding",
      deliverables: [
       'One Wedding Album (size 12" x 36") with Sparkle / 3D / Velvet / Metallic Cover',
"One Lather Box",
"One Lather Bag",
"One Mini Calendar (13Pages)",
"One Mini Album Book",
"One Transparent Page",
"One Pen Drive Box",
"One Wedding Cinematic Video",
"One Wedding Teaser",
      ],
      free: [
        "Five Wedding Reels",
        "One 64 GB SanDisk Pen Drive",
        "One Table Photo Frame",
        "One BHAGAVAD GITA",
      ],
    },
    {
      img: "../assets/wedding/w4.jpg",
      title: "Premium Wedding Package(Both sides)",
      price: "₹1,10,000.00",
      subtitle: "Haldi - Wedding-reception",
      deliverables: [
       'One Wedding Album (size 12" x 36") with Sparkle / 3D / Velvet / Metallic Cover',
"One Lather Box",
"One Lather Bag",
"One Mini Calendar (13Pages)",
"One Mini Album Book",
"One Transparent Page",
"One Pen Drive Box",
"One Wedding Cinematic Video",
"One Wedding Teaser",
      ],
      free: [
        "Five Wedding Reels",
        "One 64 GB SanDisk Pen Drive",
        "One Table Photo Frame",
        "One BHAGAVAD GITA",
      ],
    },
    {
      img: "../assets/wedding/chistian.png",
      title: "Christian Wedding",
      price: "₹30,000.00",
      subtitle: "Beautiful Chistian Weddings ",
      deliverables: [
       ' One Wedding Album (size 12" x 36")',
"One Sparkle / 3D / Velvet / Metalic Album Cover",
"Three Wedding Reals",
"One Wedding Cinematic Video",
"One 64 GB Sandisk Pen Drive",
"One Lather Box/Bag",
"One Transparent Page",
"One Pen Drive Box",
"BIBLE (For Starting A New Life with Blessings)",
      ],
      // free: [
      //   "Five Wedding Reels",
      //   "One 64 GB SanDisk Pen Drive",
      //   "One Table Photo Frame",
      //   "One BHAGAVAD GITA",
      // ],
    },
    {
      img: "../assets/wedding/chistian.png",
      title: "Christian Wedding (Option 2)",
      price: "₹20,000.00",
      subtitle: "Beautiful Chistian Weddings ",
      deliverables: [
       ' One Wedding Album (size 12" x 36") with Sparkle / 3D / Velvet / Metalic Album Cover',
       " One Wedding Cinematic Video",
        "One 64 GB Sandisk Pen Drive",
        "One Lather Box/Bag",
        "BIBLE (For Starting A New Life with Blessings)"
      ],
      // free: [
      //   "Five Wedding Reels",
      //   "One 64 GB SanDisk Pen Drive",
      //   "One Table Photo Frame",
      //   "One BHAGAVAD GITA",
      // ],
    },
    {
      img: "../assets/r1.jpg",
      title: "Premium Rice-Ceremony Package",
      price: "₹35,000.00",
      subtitle: "Rice Ceremony (Annaprashan) Coverage",
      deliverables: [
        "Rice Ceremony Album with Sparkle / Velvet Cover",
        "One Leather Box",
        "One Transparent Page",
        "One Rice Ceremony Highlight Video",
        "One Cinematic Teaser",
      ],
      free: [
        "One 64 GB SanDisk Pen Drive",
        "One Baby Table Frame",
        "One Customized Baby Photo Mug",
      ],
    },
    {
      img: "../assets/standard.png", // Blank for now
      title: "Standard Portfolio Photography Package",
      price: "₹10,000.00",
      subtitle: "",
      deliverables: [
        "6 - 7 Hours Studio Shoot",
        "2 - 3 Different Looks with Costume and Makeup",
        "10 Edited High-Resolution Portraits per Look (Retouched)",
        "All Raw Photos (Unedited)",
        "One Digital Portfolio PDF (Ready to Share)",
        "One Short Video Teaser (30 sec – 45 sec)",
        "One 64 GB SanDisk Pen Drive",
      ],
    },
    {
      img: "../assets/premium.png", // Blank for now
      title: "Premium Portfolio Photography Package",
      price: "₹20,000.00",
      subtitle: "",
      deliverables: [
        "Portfolio Album with Premium Leather / Velvet Cover",
        "One Compact Mini Album (for quick showcase)",
        "One Transparent Feature Page",
        "One Designer Pen Drive Box with Edited High-Resolution Portraits",
        "One Highlight Video Montage (Showreel)",
        "One Creative Teaser for Social Media",
      ],
      free: ["One 64 GB SanDisk Pen Drive"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="packages-container">
        {packagesData.map((item, index) => (
          <div
            key={index}
            className={`package-card ${index % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="package-img">
              {item.img ? (
                <img src={item.img} alt={item.title} />
              ) : (
                <div className="img-placeholder">Image Coming Soon</div>
              )}
            </div>

            <div className="package-details">
              <h2>{item.title}</h2>
              <h3>{item.price}</h3>
              {item.subtitle && <p className="subtitle">{item.subtitle}</p>}

              <div className="deliverables">
                <h4>Deliverables</h4>
                <ul>
                  {item.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {item.free && (
                <div className="free-section">
                  <h4>FREE</h4>
                  <ul>
                    {item.free.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Packages;
