// components/SubfolderView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";
import { listPhotoInSubfolder, getVideoLinksOfPortfolio } from "../src/s3.js";

const SubfolderView = () => {
  const { section, subfolder, type } = useParams();
  // type will be "Images" or "Videos"
  
  console.log('SubfolderView params:', { section, subfolder, type });
  console.log('SubfolderView component loaded successfully!');

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let result = [];
        if (type === "Images") {
          result = await listPhotoInSubfolder(section, subfolder);
        } else if (type === "Videos") {
          result = await getVideoLinksOfPortfolio(section, subfolder);
        }
        setItems(result);
        setError(null);
      } catch (err) {
        console.error(
          `Error fetching ${type} for ${section}/${subfolder}:`,
          err
        );
        setError(`Failed to load ${type}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [section, subfolder, type]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">
        {subfolder} - {type}
        </h1>
        {/* <div style={{padding: '20px', backgroundColor: '#f0f0f0', margin: '20px 0'}}>
          <strong>DEBUG INFO:</strong><br/>
          Section: {section}<br/>
          Subfolder: {subfolder}<br/>
          Type: {type}
        </div> */}

        {loading && <div className="loading">Loading {type}...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && items.length === 0 && (
          <div className="no-content">No {type} found.</div>
        )}

        <div className="media-grid">
          {type === "Images" &&
            items.slice(0,20).map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`photo-${i}`}
                className="media-item"
              />
            ))}

          {type === "Videos" &&
            items.map((url, i) => (
              <video key={i} controls className="media-item">
                <source src={url} type="video/mp4" />
              </video>
            ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton/>
    </>
  );
};

export default SubfolderView;
