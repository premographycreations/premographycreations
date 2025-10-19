// PortfolioHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import { listPortfolioTopFolders, getFolderCoverImages } from "../src/s3.js";
import WhatsAppButton from "./whatsappbutton.jsx";

const PortfolioHome = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFolders() {
      try {
        setLoading(true);
        const result = await listPortfolioTopFolders(); // ["Engagement","Wedding","Pre-wedding"]
        
        // attach a cover image for each section (first subfolder image)
        const enriched = await Promise.all(
          result.map(async (name) => {
            const cover = await getFolderCoverImages(name, ""); // optional default cover logic
            return { name, cover };
          })
        );

        setFolders(enriched);
        setError(null);
      } catch (err) {
        console.error("Error fetching portfolio folders:", err);
        setError("Failed to load portfolio folders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchFolders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">Portfolio</h1>

        {loading && <div className="loading">Loading portfolio folders...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && folders.length === 0 && (
          <div className="no-content">No portfolio folders found.</div>
        )}

        <div className="portfolio-grid">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="folder-card"
              onClick={() => navigate(`/portfolio/${encodeURIComponent(folder.name)}`)}
            >
              {folder.cover ? (
                <img src={folder.cover} alt={folder.name} className="cover-img" />
              ) : (
                <div className="no-cover">No Image</div>
              )}
              <h2 className="folder-title">{folder.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default PortfolioHome;
