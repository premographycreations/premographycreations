// SectionView.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./nav.jsx";
import Footer from "./footer.jsx";
import WhatsAppButton from "./whatsappbutton.jsx";
import { listPortfolioSectionSubfolders, getFolderCoverImages, getVideoLinksOfPortfolio,getSubFolderCoverImages } from "../src/s3.js";

const SectionView = () => {
  const { section } = useParams();
  const [subfolders, setSubfolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSubfolders() {
      try {
        setLoading(true);
        const result = await listPortfolioSectionSubfolders(section);

        const enriched = await Promise.all(
          result.map(async (sf) => {
            const cover = await getSubFolderCoverImages(section, sf);
            return { name: sf, cover };
          })
        );

        setSubfolders(enriched);
        setError(null);
      } catch (err) {
        console.error(`Error fetching subfolders for ${section}:`, err);
        setError(`Failed to load ${section} subfolders. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }
    fetchSubfolders();
  }, [section]);

  const handleVideosClick = async (subfolder) => {
    const links = await getVideoLinksOfPortfolio(section, subfolder);
    if (links.length > 0) {
      window.open(links[0], "_blank");
    } else {
      alert("No video links found!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">{section}</h1>

        {loading && <div className="loading">Loading {section} folders...</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && subfolders.length === 0 && (
          <div className="no-content">No subfolders found in {section}.</div>
        )}

        <div className="portfolio-grid">
          {subfolders.map((sf) => (
            <div key={sf.name} className="folder-card">
              {sf.cover ? (
                <img src={sf.cover} alt={sf.name} className="cover-img" />
              ) : (
                <div className="no-cover">No Image</div>
              )}
              <h2 className="folder-title">{sf.name}</h2>
              <div className="btn-row">
                <button
                  className="btn"
                  onClick={() =>
                    navigate(`/portfolio/${encodeURIComponent(section)}/${encodeURIComponent(sf.name)}/Images`)
                  }
                >
                  Photos
                </button>
                <button
                  className="btn"
                  onClick={() => handleVideosClick(sf.name)}
                >
                  Videos
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default SectionView;
